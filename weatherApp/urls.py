from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index),
    path('api/v1/auth/', include("users.urls")),
]