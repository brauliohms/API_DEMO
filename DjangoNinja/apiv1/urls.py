from django.contrib import admin
from django.urls import path

# from .apiNinja import api
from apiv1.apiNinja import api

urlpatterns = [path("admin/", admin.site.urls), path("v1/", api.urls)]
