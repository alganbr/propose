from django.conf.urls import url
from .views import *

app_name = 'project'

urlpatterns = [
	url(r'^projects/$', ProjectList.as_view()),
	url(r'^projects/(?P<pk>[0-9]+)/$', ProjectDetail.as_view()),
	url(r'^projects/(?P<pk>[0-9]+)/tasks$', ProjectTask.as_view()),
]