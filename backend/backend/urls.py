from django.contrib import admin
from django.urls import path
from copernicus.views import index, get_data

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', index),
    path('api/data/', get_data)
]
