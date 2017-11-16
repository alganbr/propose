from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from .models import *
from .serializers import *

# Create your views here.
class DashboardViewSet(viewsets.ViewSet):

	def list(self, reqruest):
		queryset = Dashboard.objects.all()
		serializer = DashboardSerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request, pk=None):
		queryset = Dashboard.objects.all()
		dashboard = get_object_or_404(queryset, pk=pk)
		serializer = DashboardSerializer(dashboard)
		return Response(serializer.data)

