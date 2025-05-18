from django.contrib import admin
from django.urls import path
from copernicus.views import get_reccomendations, index, get_data, calculate

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', index),
    path('api/data/', get_data),
    path('api/calculate/', calculate),
    path('api/tips/', get_reccomendations)
]
