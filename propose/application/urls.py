from django.conf.urls import url
from .views import *

app_name = 'application'

urlpatterns = [
	url(r'^applications/$', WorkApplicationList.as_view()),
    url(r'^applications/(?P<pk>[0-9]+)/$', WorkApplicationDetail.as_view()),
    url(r'^applications/(?P<pk>[0-9]+)/offer$', WorkApplicationOffer.as_view()),
    url(r'^applications/(?P<pk>[0-9]+)/offer/accept$', WorkOfferAccept.as_view()),
    url(r'^applications/(?P<pk>[0-9]+)/offer/decline$', WorkOfferDecline.as_view()),
    url(r'^requests/$', WorkRequestList.as_view()),
    url(r'^requests/(?P<pk>[0-9]+)/$', WorkRequestDetail.as_view()),
    url(r'^requests/(?P<pk>[0-9]+)/decline$', WorkRequestDecline.as_view()),
]