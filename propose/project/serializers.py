from rest_framework import serializers

from .models import *
from account.models import Account
from account.serializers import AccountSerializer
from dashboard.models import Dashboard
from dashboard.serializers import DashboardSerializer
from tag.models import Tag
from tag.serializers import TagSerializer

"""
GET
"""
class CompensationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Compensation
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):

    client = AccountSerializer(Account)
    client_dashboard = DashboardSerializer(Dashboard)
    freelancer_dashboard = DashboardSerializer(Dashboard)
    tags = TagSerializer(many=True)
    compensation = CompensationSerializer(Compensation)

    class Meta:
        model = Project
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):

    project = serializers.SlugRelatedField(read_only=True, slug_field='title')

    class Meta:
        model = Task
        fields = '__all__'

"""
POST
"""
class CompensationCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Compensation
        fields = '__all__'

class TaskCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ('project', 'name', 'description', )

class ProjectCreateSerializer(serializers.ModelSerializer):
    compensation = CompensationCreateSerializer()

    class Meta:
        model = Project
        fields = ('client', 'title', 'description', 'tags', 'compensation', )

    def create(self, validated_data):
        compensation_data = validated_data.pop('compensation')
        compensation = Compensation.objects.create(**compensation_data)
        tags_data = validated_data.pop('tags')
        project = Project.objects.create(compensation=compensation, **validated_data)
        project.tags = tags_data

        return project
