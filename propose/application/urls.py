from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from .views import *

app_name = 'applcation'

router = DefaultRouter()
router.register(r'work_application', WorkApplicationViewSet, base_name='work_application')
router.register(r'work_offer', WorkOfferViewSet, base_name='work_offer')
router.register(r'work_request', WorkRequestViewSet, base_name='work_request')
urlpatterns = router.urls