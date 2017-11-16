from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from .views import *

app_name = 'account'

router = DefaultRouter()
router.register(r'user', AccountViewSet, base_name='account')
urlpatterns = router.urls