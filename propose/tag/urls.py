from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from .views import *

app_name = 'tag'

router = DefaultRouter()
router.register(r'tag', TagViewSet, base_name='tag')
urlpatterns = router.urls