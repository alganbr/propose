from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from .views import *

app_name = 'project'

# TODO currently, this uses PUT for update instead of POST
router = DefaultRouter()
router.register(r'projects', ProjectViewSet, base_name='project')
urlpatterns = router.urls
