from rest_framework import serializers

from .models import *
from account.models import Account
from account.serializers import AccountSerializer

class DashboardSerializer(serializers.ModelSerializer):

    owner = AccountSerializer(Account)

    class Meta:
        model = Dashboard
        fields = '__all__'
