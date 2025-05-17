from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from .requests.uv import get_uv
from .requests.pollen import get_pollen_data_json
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

            pollen = get_pollen_data_json(lat, long)
            uv = get_uv(long, lat)

            print(pollen)
            
            return JsonResponse({'uv': uv, 'pollen': pollen}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)