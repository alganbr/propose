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
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin

from django.views import generic
from django.views.generic.base import RedirectView
from django.core.urlresolvers import reverse_lazy
from django.contrib.auth.views import LoginView, LogoutView

from .forms import *
from .views import *

urlpatterns = [
    url(r'^$', RedirectView.as_view(url=reverse_lazy('login'))),
    # url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^login$', LoginView.as_view(template_name='login.html', redirect_field_name='home', form_class=LoginForm, redirect_authenticated_user=True), name='login'),
    url(r'^register/$', RegisterView.as_view(), name='register'),
    url(r'^logout/$', LogoutView.as_view(redirect_field_name='login'), name='logout'),
    url(r'^profile/', generic.TemplateView.as_view(template_name='profile.html')),
    url(r'^user/(?P<pk>[0-9]+)/$', generic.TemplateView.as_view(template_name='otherprofile.html')),
    url(r'^admin/', admin.site.urls),
    url(r'^home/', generic.TemplateView.as_view(template_name='home.html'), name='home'),
    url(r'^freelancer_search/', generic.TemplateView.as_view(template_name='freelancer_search.html')),
    url(r'^project_search/', generic.TemplateView.as_view(template_name='project_search.html')),
    url(r'^client_project_view/', generic.TemplateView.as_view(template_name='client_project_view.html')),
    url(r'^projects/(?P<pk>[0-9]+)/$', generic.TemplateView.as_view(template_name='projectview.html')),
    url(r'^projects/(?P<pk>[0-9]+)/edit$', generic.TemplateView.as_view(template_name='projectedit.html')),
    url(r'^api/', include('account.urls', namespace='account')),
    url(r'^api/', include('application.urls', namespace='application')),
    url(r'^api/', include('dashboard.urls', namespace='dashboard')),
    url(r'^api/', include('project.urls', namespace='project')),
    url(r'^api/', include('tag.urls', namespace='tag')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
