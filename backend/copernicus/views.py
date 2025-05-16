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


            df = get_uv(long, lat)

            df['valid_time'] = df['valid_time'].astype(str)  
            df = df.fillna(0)
            json_data = df.to_dict(orient='records')

            json_data = df.to_dict(orient='records')
            print(json_data)
            return JsonResponse({'data': json_data}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)