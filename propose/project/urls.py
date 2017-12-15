from django.conf.urls import url
from .views import *

app_name = 'project'

urlpatterns = [
	url(r'^projects/$', ProjectList.as_view()),
	url(r'^projects/(?P<pk>[0-9]+)/$', ProjectDetail.as_view()),
	url(r'^projects/(?P<pk>[0-9]+)/tasks$', ProjectTask.as_view()),
	url(r'^projects/(?P<pk>[0-9]+)/tasks/(?P<task_number>[0-9]+)/$', ProjectTaskDetail.as_view()),
	url(r'^projects/(?P<pk>[0-9]+)/comments$', ProjectCommentDetail.as_view()),
]
