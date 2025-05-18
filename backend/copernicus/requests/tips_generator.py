from backend.copernicus.requests.testdata.test_output import TEST_OUTPUT
from backend.copernicus.requests.score_calculator import calculate_score
from dotenv import load_dotenv
from openai import OpenAI
import os

client = None
def get_client():
    load_dotenv('backend/copernicus/requests/satellite_requests/.env')
    client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
    return client

def parse_response(arr_str):
    tips = arr_str.split('\n\n')
    return tips

def get_params_from_dict_input(data):
    params = data['data']
    return [params['uv']['scaled_value'], params['green_density'], params['city_density'], params['air_pollution']['scaled_value'], max(params['pollen'].values())]

def generate_tips(diseases, dict_data, panic_score=0.0):
    global client
    """ Generates 5 tips based on the values you pass to it for the calculated environment data.

    Args:
        diseases (_type_): The diseases the person suffers from
        dict_data (dict): The calculated normalized environmental data as a dictionary
        panic_score (float, optional): If you have calculated a panic score tips for that panic score will be returned

    Returns:
        _type_: An array with 5 strings or the tips
    """
    params = get_params_from_dict_input(dict_data)
    if client == None: client = get_client()
    
    starting_str = ''
    if len(diseases) == 0: starting_str = 'A healthy person '
    else: 
        starting_str = 'A person with '
        for disease in diseases: starting_str += f'{diseases}, '
    prompt = f'''
    {starting_str} is exposed to the following normalized environmental conditions (all values are between 0 and 1 where every parameter influences the person differenlty based on their disease (for a healthy person should be the best)). Estimate a panic score from 0 to 1, where 0 is no panic and 1 is full panic if the panic score isn't provided below. In one sentence return 5 tips (every tip should be around 15 words) for what the person should do today in a creative way. 

    UV Index: {params[0]}
    Greenness: {params[1]}
    City Density: {params[2]}  
    Pollution: {params[3]}
    Pollen: {params[4]}

    Generate all in new lines. Just print the tips without numbers or bullet points and only one new line character.
    '''
    if panic_score != 0: prompt += f'My calculated panic score: {panic_score}'

    response = client.responses.create(
        model="gpt-4o-mini",
        input=prompt,
        temperature=0.75
    )

    return parse_response(response.output_text)
    
# print(parse_array(example_tips_str))
# arr = generate_tips(diseases=['asthma'], dict_data=TEST_OUTPUT, panic_score=calculate_score('asthma', TEST_OUTPUT['data'], 21))
# for a in arr:
#     print(a)