"""propose URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin

from django.views import generic
from rest_framework.routers import DefaultRouter

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', generic.TemplateView.as_view(template_name='view1.html')),
    url(r'^view2/', generic.TemplateView.as_view(template_name='view2.html')),
    url(r'', include('account.urls', namespace='account')),
    url(r'', include('application.urls', namespace='application')),
    url(r'', include('dashboard.urls', namespace='dashboard')),
    url(r'', include('project.urls', namespace='project')),
    url(r'', include('tag.urls', namespace='tag')),
]
