from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from .views import *

app_name = 'account'

urlpatterns = [
	url(r'^users/$', AccountList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', AccountDetail.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/review$', AccountReview.as_view()),
    url(r'^profile/$', ProfileDetail.as_view()),
]