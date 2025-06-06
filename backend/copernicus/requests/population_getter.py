import math

from geopy.geocoders import Nominatim
from csv import reader
import json

population_data = None

def get_municipality_from_location(lat, lng):
    geolocator = Nominatim(user_agent="exercises")
    location = geolocator.reverse((lat, lng), language='en')

    if location and location.raw:
        address = location.raw.get('address', {})
        municipality = address.get('city') or address.get('town') or address.get('village') or address.get('municipality')
        return municipality
    else:
        return None

def get_population_from_location(lat, lng, population_data_=None):
    global population_data
    if population_data_ is not None:
        population_data = population_data_
    else:
        if population_data == None:
            with open('population_data.json', 'r') as file:
                population_data = json.load(file)
    municipality = get_municipality_from_location(lat, lng)
    for city in population_data:
        if city["city"] == municipality:
            return {"city": municipality, "population": city["population"]}
    tmp_lat = population_data[0]["latitude"]
    tmp_lng = population_data[0]["longitude"]
    minimum_distance = math.sqrt(pow(lat - tmp_lat, 2) + pow(lng - tmp_lng, 2))
    result_pop = population_data[0]["population"]
    result_name = population_data[0]["city"]
    for city in population_data:
        city_lat = city["latitude"]
        city_lng = city["longitude"]
        distance = math.sqrt(pow(lat - city_lat, 2) + pow(lng - city_lng, 2))
        if distance < minimum_distance:
            minimum_distance = distance
            result_name = city["city"]
            result_pop = city["population"]

    return {"city": result_name, "population": result_pop}

def transform_mk_json():
    with open('mk.csv') as file:
        data = list(reader(file))[1:]

    result = []
    for line in data:
        entry = {
            'city': line[0],
            'latitude': float(line[1]),
            'longitude': float(line[2]),
            'population': line[7]
        }
        result.append(entry)

    result = validate_data_json(result)
    print(result)

    with open('population_data.json', 'w') as file:
        json.dump(result, file, indent=0)

def validate_data_json(data):
    for line in data:
        city_name = line['city']
        municipality = get_municipality_from_location(line["latitude"], line["longitude"])
        if city_name != municipality:
            line['city'] = municipality


