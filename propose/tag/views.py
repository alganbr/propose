from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *

# Create your views here.
class TagList(APIView):
    """
    /api/tags
    """
    def get(self, request, format=None):
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TagSerializer(data=request.data)
        if serializer.is_valid():
            # Lowercase tag name, and check if tag already exists or not
            name = serializer.validated_data["name"].lower()
            tags = Tag.objects.filter(name=name)

            if len(tags) != 0:
                return Response(None, status=status.HTTP_409_CONFLICT)
            else:
                serializer.validated_data["name"] = name
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
