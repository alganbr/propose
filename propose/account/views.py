from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.db.models import Avg
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics

import math

from .models import *
from .serializers import *

# Create your views here.
class AccountList(APIView):
    """
    /api/users
    """
    def get(self, request, format=None):
        accounts = Account.objects.all()
        alltags = self.request.query_params.get('tags', None)
        if alltags is not None:
            tag_list = alltags.split(u',')
            for tag in tag_list:
                tag = tag.strip()
                if tag is not "":
                    accounts = accounts.filter(skills__name=tag)
        allterms = self.request.query_params.get('search_terms', None)
        if allterms is not None:
            term_list = allterms.split(u' ')
            for term in term_list:
                term = term.strip()
                if term is not "":
                    accounts = accounts.filter(Q(user__username__iexact=term) | Q(user__first_name__iexact=term) | Q(user__last_name__iexact=term))
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AccountCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AccountDetail(APIView):
    """
    /api/users/<id>
    """
    def get_object(self, pk):
        return get_object_or_404(Account, pk=pk)

    def get(self, request, pk, format=None):
        account = self.get_object(pk)
        serializer = AccountSerializer(account)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        account = self.get_object(pk)
        account.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AccountReview(APIView):
    """
    /api/users/<id>/review
    """

    def get_object(self, pk):
        return get_object_or_404(Account, pk=pk)

    def get(self, request, pk, format=None):
        account = self.get_object(pk)
        reviews = UserReview.objects.filter(reviewee=account)
        serializer = UserReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        reviewee_account = self.get_object(pk)
        reviewer_account = get_object_or_404(Account, user=request.user.pk)
        userreview_data = request.data
        userreview_data['reviewee'] = reviewee_account.pk
        userreview_data['reviewer'] = reviewer_account.pk
        serializer = UserReviewCreateSerializer(data=userreview_data)
        if serializer.is_valid():
            serializer.save()

            # update reviewee rating
            rating = UserReview.objects.aggregate(rating=Avg('rating'))['rating']
            rating = math.floor(rating * 10)/10 # round to 1 decimal
            reviewee_account.rating = rating
            reviewee_account.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileDetail(APIView):
    """
    /api/profile
    """

    def get(self, request, format=None):
        if request.user.is_anonymous():
            return Response(status=status.HTTP_204_NO_CONTENT)
        account = get_object_or_404(Account, user=request.user)
        serializer = AccountSerializer(account)
        return Response(serializer.data)

    def post(self, request, format=None):
        if request.user.is_anonymous():
            return Response(status=status.HTTP_204_NO_CONTENT)
        account = get_object_or_404(Account, user=request.user)
        serializer = AccountUpdateSerializer(account, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



