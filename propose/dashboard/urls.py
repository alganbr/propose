from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from .views import *

app_name = 'dashboard'

router = DefaultRouter()
router.register(r'dashboard', DashboardViewSet, base_name='dashboard')
urlpatterns = router.urls