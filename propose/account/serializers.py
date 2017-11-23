from rest_framework import serializers
from django.contrib.auth.models import User

from .models import *
from tag.models import *
from tag.serializers import *

"""
GET
"""
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        exclude = ('password', )

class AccountSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    skills = TagSerializer(many=True)

    class Meta:
        model = Account
        fields = '__all__'

class UserReviewSerializer(serializers.ModelSerializer):
    reviewee = AccountSerializer()
    reviewer = AccountSerializer()

    class Meta:
        model = UserReview
        fields = '__all__'

"""
POST
"""
class UserCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'password', )

class AccountCreateSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Account
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        account = Account.objects.create(user=user, **validated_data)
        return account

class UserReviewCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserReview
        fields = ('reviewee','reviewer', 'review', 'rating', )

