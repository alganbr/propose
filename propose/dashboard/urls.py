from django.conf.urls import url
from .views import *

app_name = 'dashboard'

urlpatterns = [
	url(r'^dashboards/working/$', DashboardWorkingList.as_view()),
	url(r'^dashboards/completed/$', DashboardCompletedList.as_view()),
]