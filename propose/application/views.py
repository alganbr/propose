from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics

from .models import *
from .serializers import *
from django.utils import timezone

# permissions
def user_restricted(request, application):
    # check if the user is related to the applicaiton (either client or freelancer)
    related_user = get_object_or_404(Account, user=request.user)
    freelancer = application.details.freelancer
    client = application.details.client
    if client.pk is not related_user.pk and freelancer.pk is not related_user.pk:
        return True # error
    return False # pass

def client_only(request, application):
    # check if the current user is the client to the work application
    related_user = get_object_or_404(Account, user=request.user)
    client = application.details.client
    if client.pk is not related_user.pk:
        return True # error
    return False # pass

def freelancer_only(request, application):
    # check if the current user is the freelancer to the work application
    related_user = get_object_or_404(Account, user=request.user)
    freelancer = application.details.freelancer
    if freelancer.pk is not related_user.pk:
        return True # error
    return False # pass

# Create your views here.
class WorkApplicationList(APIView):
    """
    /api/applications
    """
    def get(self, request, format=None):
        application = WorkApplication.objects.filter(details__freelancer=request.user.pk)
        serializer = WorkApplicationSerializer(application, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = WorkApplicationCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WorkApplicationDetail(APIView):
    """
    /api/applications/<id>
    """
    def get_object(self, pk):
        return get_object_or_404(WorkApplication, pk=pk)

    def get(self, request, pk, format=None):
        work_application = self.get_object(pk)
        serializer = WorkApplicationSerializer(work_application)
        error = user_restricted(request, work_application)
        if error:
            return Response(None, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        work_application = self.get_object(pk)
        error = freelancer_only(request, work_application)
        if error:
            return Response(None, status=status.HTTP_401_UNAUTHORIZED)
        work_application.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class WorkApplicationDecline(APIView):
    """
    /api/application/<id>/decline
    """
    def get_object(self, pk):
        return get_object_or_404(WorkApplication, pk=pk)

    def post(self, request, pk, format=None):
        work_application = self.get_object(pk)
        error = client_only(request, work_application)
        if error:
            return Response(None, status=status.HTTP_401_UNAUTHORIZED)
        work_application.is_declined = True
        work_application.save()
        return Response(None, status=status.HTTP_200_OK)

class WorkApplicationOffer(APIView):
    """
    /api/applications/<id>/offer
    """

    def get_object(self, pk):
        return get_object_or_404(WorkApplication, pk=pk)

    def get(self, request, pk, format=None):
        work_application = self.get_object(pk)
        work_offer = get_object_or_404(WorkOffer, application=work_application.pk)
        serializer = WorkOfferSerializer(work_offer)
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        work_application = self.get_object(pk)
        error = client_only(request, work_application)
        if error:
            return Response(None, status=status.HTTP_401_UNAUTHORIZED)
        work_offer_data = request.data
        work_offer_data['application'] = work_application.pk
        serializer = WorkOfferCreateSerializer(data=work_offer_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        work_application = self.get_object(pk)
        error = client_only(request, work_application)
        if error:
            return Response(None, status=status.HTTP_401_UNAUTHORIZED)
        work_offer = get_object_or_404(WorkOffer, application=work_application.pk)
        work_offer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class WorkOfferAccept(APIView):
    """
    /api/applications/<id>/offer/accept
    """
    def get_object(self, pk):
        return get_object_or_404(WorkApplication, pk=pk)

    def work_application_valid(self, request, work_offer):
        time_diff = work_offer.expire_time - timezone.now()
        if time_diff.total_seconds() > 0:
            return True # work application is still valid
        return False # work application is expired

    def post(self, request, pk, format=None):
        work_application = self.get_object(pk)
        work_offer = get_object_or_404(WorkOffer, application=work_application.pk)

        # check if the work offer is related to the work application
        if work_offer.application.pk is not work_application.pk:
            return Response(None, status=status.HTTP_400_BAD_REQUEST)

        # check freelancer only feature
        error = freelancer_only(request, work_application)
        if error:
            return Response(None, status=status.HTTP_401_UNAUTHORIZED)

        # check expire time
        if self.work_application_valid(request, work_offer):
            work_offer.is_accepted = True
            work_offer.save()
        else:
            return Response(None, status=status.HTTP_400_BAD_REQUEST)
        return Response(None, status=status.HTTP_200_OK)

class WorkOfferDecline(APIView):
    """
    /api/applications/<id>/offer/decline
    """
    def get_object(self, pk):
        return get_object_or_404(WorkApplication, pk=pk)

    def work_application_valid(self, request, work_offer):
        time_diff = work_offer.expire_time - timezone.now()
        if time_diff.total_seconds() > 0:
            return True # work application is still valid
        return False # work application is expired

    def post(self, request, pk, format=None):
        work_application = self.get_object(pk)
        work_offer = get_object_or_404(WorkOffer, application=work_application.pk)

        # check if the work offer is related to the work application
        if work_offer.application.pk is not work_application.pk:
            return Response(None, status=status.HTTP_400_BAD_REQUEST)

        # check freelancer only feature
        error = freelancer_only(request, work_application)
        if error:
            return Response(None, status=status.HTTP_401_UNAUTHORIZED)

        # check expire time
        if self.work_application_valid:
            work_offer.is_accepted = True
            work_offer.save()
        else:
            return Response(None, status=status.HTTP_200_OK)

class WorkRequestList(APIView):
    """
    /api/requests
    """
    def get(self, request, format=None):
        application = WorkRequest.objects.filter(details__freelancer=request.user.pk)
        serializer = WorkRequestSerializer(application, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = WorkRequestCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WorkRequestDetail(APIView):
    """
    /api/requests/<id>
    """
    def get_object(self, pk):
        return get_object_or_404(WorkRequest, pk=pk)

    def user_restricted(self, request, work_request):
        # check if the user is related to the applicaiton (either client or freelancer)
        related_user = Account.objects.get(user=request.user)
        freelancer = work_request.details.freelancer
        client = work_request.details.client
        if client.pk is not related_user.pk and freelancer.pk is not related_user.pk:
            return True # error
        return False # pass

    def get(self, request, pk, format=None):
        work_request = self.get_object(pk)
        serializer = WorkRequestsSerializer(work_request)
        error = user_restricted(request, work_request)
        if error:
            return Response(None, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        work_request = self.get_object(pk)
        error = client_only(request, work_request)
        if error:
            return Response(None, status=status.HTTP_401_UNAUTHORIZED)
        work_request.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class WorkRequestDecline(APIView):
    """
    /api/requests/<id>/decline
    """
    def get_object(self, pk):
        return get_object_or_404(WorkRequest, pk=pk)

    def post(self, request, pk, format=None):
        work_request = self.get_object(pk)
        error = freelancer_only(request, work_request)
        if error:
            return Response(None, status=status.HTTP_401_UNAUTHORIZED)
        work_request.is_declined = True
        work_request.save()
        return Response(None, status=status.HTTP_200_OK)

