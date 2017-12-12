from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from .views import *

app_name = 'tag'

urlpatterns = [
    url(r'^tags/$', TagList.as_view()),
]
