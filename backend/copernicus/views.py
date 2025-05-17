from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from .requests.uv import get_uv
from .requests.pollen import get_pollen_data_json
from .requests.greenness_density import greenness_density
from .requests.city_density import city_density
from .requests.airPollution2 import get_air_pollution
from .requests.ozone_density import ozone_density
from .requests.population_getter import get_population_from_location

import pandas as pd

# Create your views here.
def index(request):
    return JsonResponse({"message": "zdravo"})


@csrf_exempt
def get_data(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            long = data.get('longitude')
            lat = data.get('latitude')


            # vrakam tuka scoreovi za site
            # 1. gi soberam site
            pollen = get_pollen_data_json(lat=lat, lon=long)
            uv = get_uv(long=long, lat=lat)
            green_density = greenness_density(latitude=lat, longitude=long)
            city_density_ = city_density(latitude=lat, longitude=long)
            air_pollution = get_air_pollution(lat=lat, long=long)
            ozone_density_ = ozone_density(latitude=lat, longitude=long)
            # ......
            
            # gi vrakam scoreovite

            print(pollen)
            
            return JsonResponse({'uv': uv, 'pollen': pollen}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    

