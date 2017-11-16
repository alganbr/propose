from rest_framework import serializers

from .models import *
from account.models import Account
from account.serializers import AccountSerializer

class ApplicationDetailSerializer(serializers.ModelSerializer):

	client = AccountSerializer(Account)
	freelancer = AccountSerializer(Account)

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
		model = WorkApplication
		fields = '__all__'

class WorkRequestSerializer(serializers.ModelSerializer):

	details = ApplicationDetailSerializer(ApplicationDetail)

	class Meta:
		model = WorkApplication
		fields = '__all__'