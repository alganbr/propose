from rest_framework import serializers

from .models import *
from account.models import *

"""
GET
"""
class ApplicationDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = ApplicationDetail
        fields = '__all__'

class WorkApplicationSerializer(serializers.ModelSerializer):

    details = ApplicationDetailSerializer(ApplicationDetail)

    class Meta:
        model = WorkApplication
        fields = '__all__'

class WorkOfferSerializer(serializers.ModelSerializer):

    details = ApplicationDetailSerializer(ApplicationDetail)

    class Meta:
        model = WorkOffer
        fields = '__all__'

class WorkRequestSerializer(serializers.ModelSerializer):

    details = ApplicationDetailSerializer(ApplicationDetail)

    class Meta:
        model = WorkRequest
        fields = '__all__'

"""
POST
"""
class ApplicationDetailCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = ApplicationDetail
        fields = ('message', 'client', 'project', 'freelancer', )

class WorkApplicationCreateSerializer(serializers.ModelSerializer):

    details = ApplicationDetailCreateSerializer(ApplicationDetail)

    class Meta:
        model = WorkApplication
        fields = ('details', )

    def create(self, validated_data):
        current_user = self.context['request'].user
        user_account = Account.objects.get(pk=current_user.pk)
        validated_data['details']['freelancer'] = user_account # the freelancer must be the current user
        application_detail_data = validated_data.pop('details')
        application_detail = ApplicationDetail.objects.create(**application_detail_data)
        work_application = WorkApplication.objects.create(details=application_detail, **validated_data)
        return work_application

class WorkOfferCreateSerializer(serializers.ModelSerializer):

    details = ApplicationDetailCreateSerializer(ApplicationDetail)

    class Meta:
        model = WorkOffer
        fields = ('details', 'applicatoin','expire_time')

class WorkRequestCreateSerializer(serializers.ModelSerializer):

    details = ApplicationDetailCreateSerializer(ApplicationDetail)

    class Meta:
        model = WorkRequest
        fields = ('details', )

    def create(self, validated_data):
        current_user = self.context['request'].user
        user_account = Account.objects.get(pk=current_user.pk)
        validated_data['details']['client'] = user_account # the client must be the current user
        application_detail_data = validated_data.pop('details')
        application_detail = ApplicationDetail.objects.create(**application_detail_data)
        work_request = WorkRequest.objects.create(details=application_detail, **validated_data)
        return work_request
