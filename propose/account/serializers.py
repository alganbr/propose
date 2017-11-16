from rest_framework import serializers
from django.contrib.auth.models import User

from .models import *

class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		exclude = ('password', )


class AccountSerializer(serializers.ModelSerializer):
	
	user = UserSerializer(User)
	skills = serializers.SlugRelatedField(read_only=True, many=True, slug_field='name')

	class Meta:
		model = Account
		fields = '__all__'
