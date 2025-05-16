from django.contrib import admin
from django.urls import path
from copernicus.views import index, get_uv_

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', index),
    path('uv/', get_uv_)
]
