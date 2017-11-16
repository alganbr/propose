from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from .models import *
from .serializers import *

# Create your views here.
class WorkApplicationViewSet(viewsets.ViewSet):

	def list(self, reqruest):
		queryset = WorkApplication.objects.all()
		serializer = WorkApplicationSerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request, pk=None):
		queryset = WorkApplication.objects.all()
		work_application = get_object_or_404(queryset, pk=pk)
		serializer = WorkApplicationSerializer(work_application)
		return Response(serializer.data)

class WorkOfferViewSet(viewsets.ViewSet):

	def list(self, reqruest):
		queryset = WorkOffer.objects.all()
		serializer = WorkOfferSerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request, pk=None):
		queryset = WorkOffer.objects.all()
		work_offer = get_object_or_404(queryset, pk=pk)
		serializer = WorkOfferSerializer(work_offer)
		return Response(serializer.data)

class WorkRequestViewSet(viewsets.ViewSet):

	def list(self, reqruest):
		queryset = WorkRequest.objects.all()
		serializer = WorkRequestSerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request, pk=None):
		queryset = WorkRequest.objects.all()
		work_request = get_object_or_404(queryset, pk=pk)
		serializer = WorkRequestSerializer(work_application)
		return Response(serializer.data)