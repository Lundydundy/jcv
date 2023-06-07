from django.contrib import admin
from django.urls import path
from . import views



urlpatterns = [
    path("", views.index, name="index"),
    path("jobs", views.job_modal_info, name="jobs"),
]