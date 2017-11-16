from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from .views import *

app_name = 'project'

router = DefaultRouter()
router.register(r'project', ProjectViewSet, base_name='project')
urlpatterns = router.urls