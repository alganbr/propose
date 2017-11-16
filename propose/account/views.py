from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from .models import *
from .serializers import *

# Create your views here.
class AccountViewSet(viewsets.ViewSet):

	def list(self, reqruest):
		queryset = Account.objects.all()
		serializer = AccountSerializer(queryset, many=True)
		return Response(serializer.data)

	def retrieve(self, request, pk=None):
		queryset = Account.objects.all()
		account = get_object_or_404(queryset, pk=pk)
		serializer = AccountSerializer(account)
		return Response(serializer.data)
