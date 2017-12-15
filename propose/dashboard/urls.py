from django.conf.urls import url
from .views import *

app_name = 'dashboard'

urlpatterns = [
	url(r'^dashboards/working/$', DashboardWorkingList.as_view()),
	url(r'^dashboards/completed/$', DashboardCompletedList.as_view()),
	url(r'^dashboards/user/(?P<pk>[0-9]+)/working/$', DashboardUserWorkingList.as_view()),
	url(r'^dashboards/user/(?P<pk>[0-9]+)/completed/$', DashboardUserCompletedList.as_view()),
]