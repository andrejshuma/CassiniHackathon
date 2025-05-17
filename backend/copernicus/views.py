from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from .requests.uv import get_uv
import pandas as pd

# Create your views here.
def index(request):
    return JsonResponse({"message": "zdravo"})


@csrf_exempt  
def get_uv_(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            print(data)
            long = data.get('longitude')
            lat = data.get('latitude')


            uv = get_uv(long, lat)
            
            return JsonResponse({'uv': uv}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)