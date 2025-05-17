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

def get_population_from_location(lat, lng):
    global population_data
    if population_data == None:
        with open('population_data.json', 'r') as file:
            population_data = json.load(file)
    municipality = get_municipality_from_location(lat, lng)
    for city in population_data:
        if city["city"] == municipality:
            return city["population"]
    return None

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
        if city_name == 'DraДЌevo': continue
        if city_name != municipality:
            line['city'] = municipality
            print(city_name + " " + municipality)
    return data 