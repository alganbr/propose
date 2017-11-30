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
    user = UserCreateSerializer()

    class Meta:
        model = Account
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        password = user_data.pop('password')
        user = User.objects.create(**user_data)
        user.set_password(password)
        skills_data = validated_data.pop('skills')
        account = Account.objects.create(user=user, **validated_data)
        account.skills = skills_data
        return account

class UserUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password', )

class AccountUpdateSerializer(serializers.ModelSerializer):
    user = UserUpdateSerializer()

    class Meta:
        model = Account
        fields = '__all__'

    def update(self, instance, validated_data):
        account = Account.objects.get(pk=instance.id)
        user = User.objects.get(pk=account.user.id)
        user_data = validated_data.pop('user')
        password = user_data.pop('password')
        user.set_password(password)
        user.email = user_data['email']
        user.first_name = user_data['first_name']
        user.last_name = user_data['last_name']
        user.save()
        account.bio = validated_data['bio']
        account.skills = validated_data['skills']
        account.rating = validated_data['rating']
        account.save()
        return account

class UserReviewCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserReview
        fields = ('reviewee','reviewer', 'review', 'rating', )

