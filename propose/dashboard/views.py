from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.db.models import Q

from .models import *
from .serializers import *
from project.models import *
from project.serializers import *

# Create your views here.
class DashboardWorkingList(APIView):
    """
    /api/dashboards/working
    """
    def get(self, request, format=None):
        if request.user.is_anonymous():
            return Response(status=status.HTTP_204_NO_CONTENT)
        dashboard = get_object_or_404(Dashboard, owner=request.user.pk, is_completed_dashboard=False)
        projects = Project.objects.filter(Q(client_dashboard=dashboard) | Q(freelancer_dashboard=dashboard))
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

class DashboardCompletedList(APIView):
    """
    /api/dashboards/completed
    """
    def get(self, request, format=None):
        if request.user.is_anonymous():
            return Response(status=status.HTTP_204_NO_CONTENT)
        dashboard = get_object_or_404(Dashboard, owner=request.user.pk, is_completed_dashboard=True)
        projects = Project.objects.filter(Q(client_dashboard=dashboard) | Q(freelancer_dashboard=dashboard))
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)