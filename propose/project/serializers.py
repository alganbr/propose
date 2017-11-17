from rest_framework import serializers

from .models import *
from account.models import Account
from account.serializers import AccountSerializer
from dashboard.models import Dashboard
from dashboard.serializers import DashboardSerializer

class CompensationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Compensation
        fields = ('currency', 'value', )

class ProjectSerializer(serializers.ModelSerializer):

    client = AccountSerializer(Account)
    dashboard = DashboardSerializer(Dashboard)
    tags = serializers.SlugRelatedField(read_only=True, many=True, slug_field='name')
    compensation = CompensationSerializer(Compensation)

    class Meta:
        model = Project
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):

    project = serializers.SlugRelatedField(read_only=True, slug_field='title')

    class Meta:
        model = Task
        fields = '__all__'
