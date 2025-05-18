from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

from .requests.score_calculator import calculate_score
from .requests.uv import get_uv
from .requests.pollen import get_pollen_data_json
from .requests.greenness_density import greenness_density
from .requests.city_density import city_density
from .requests.airPollution2 import get_air_pollution
from .requests.ozone_density import ozone_density
from .requests.population_getter import get_population_from_location
from concurrent.futures import ThreadPoolExecutor
import pandas as pd
from pathlib import Path
from .pop_helper import pop_data
from .requests.testdata.test_output import TEST_OUTPUT

# Create your views here.
def index(request):
    return JsonResponse({"message": "zdravo"})

@csrf_exempt
def calculate(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode('utf-8'))
            age = data["age"]
            diseases = data["diseases"]
            scores = data["scores"]

            score = calculate_score(diseases=diseases, scores=scores, age=age)
            return JsonResponse({"score": score}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def get_data(request):
    if request.method == 'POST':
        try:

            # ZA PREZENTACIJA
            results = TEST_OUTPUT
            

            # NORMALEN NACIN :::::
            # data = json.loads(request.body.decode('utf-8'))
            # long = data.get('longitude')
            # lat = data.get('latitude')
            # city = get_population_from_location(lat=lat, lng=long, population_data_=pop_data)['city']
            # with ThreadPoolExecutor(max_workers=5) as executor:
            #     pollen = executor.submit(get_pollen_data_json,lat=lat, lon=long)
            #     uv = executor.submit(get_uv, long=long, lat=lat)
            #     green_density = executor.submit(greenness_density, latitude=lat, longitude=long)
            #     city_density_ = executor.submit(city_density, latitude=lat, longitude=long)
            #     air_pollution = executor.submit(get_air_pollution, lat=lat, long=long, city=city)
            #     ozone_density_ = executor.submit(ozone_density, latitude=lat, longitude=long)
            
            #     results = {
            #         'pollen': pollen.result(),
            #         'uv': uv.result(),
            #         'green_density': green_density.result(),
            #         'city_density': city_density_.result(),
            #         'air_pollution': air_pollution.result(),
            #         'ozone_density': ozone_density_.result()
            #     }
            
            print(results)

            return JsonResponse({'data': results}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
    

