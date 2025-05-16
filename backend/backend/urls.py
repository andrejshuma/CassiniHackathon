from django.contrib import admin
from django.urls import path
from copernicus.views import index, my_post_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', index),
    path('endpoint/', my_post_view)
]
