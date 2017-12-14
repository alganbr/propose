import django.contrib.auth.models as auth_models
import factory
from . import models

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = auth_models.User

    username = factory.Sequence(lambda n: 'user%d' % n)
    password = factory.PostGenerationMethodCall('set_password', 'test')
    is_active = True

class AccountFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Account
        django_get_or_create = ['user']

    user = factory.SubFactory(UserFactory)

class UserReviewFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.UserReview

    reviewee = factory.SubFactory(AccountFactory)
    reviewer = factory.SubFactory(AccountFactory)
    review = 'This is a review.'
    rating = 4
