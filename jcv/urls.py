from django.contrib import admin
from django.urls import path
from . import views



urlpatterns = [
    path("", views.index, name="index"),
    path("jobs", views.job_modal_info, name="jobs"),
    path("jcv/login", views.login_view, name='login'),
    path("jcv/logout", views.logout_view, name="logout"),

    #API

    path("custom/<str:custom>", views.customise, name="customise"),
    path("edit/<str:text>", views.edit_text, name="edittext"),

]