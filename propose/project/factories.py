import factory
from . import models
from account.factories import AccountFactory

class CompensationFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Compensation

    currency = factory.Faker('currency_code')
    value = 99

class ProjectFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Project

    client = factory.SubFactory(AccountFactory)
    title = factory.Faker('sentence', nb_words=4)
    description = factory.Faker('paragraph')
    compensation = factory.SubFactory(CompensationFactory)

class TakenProjectFactory(ProjectFactory):
    class Meta:
        exclude = ['freelancer']

    freelancer = factory.SubFactory(AccountFactory)
    client_dashboard = factory.LazyAttribute(lambda proj: proj.client.dashboard_set.get(is_completed_dashboard=False))
    freelancer_dashboard = factory.LazyAttribute(lambda proj: proj.freelancer.dashboard_set.get(is_completed_dashboard=False))

class TaskFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Task

    project = factory.SubFactory(TakenProjectFactory)
    name = factory.Faker('sentence', nb_words=4)
    description = factory.Faker('paragraph')

class ProjectCommentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.ProjectComment

    project = factory.SubFactory(TakenProjectFactory)
    user = factory.SubFactory(AccountFactory)
    comment = factory.Faker('paragraph')
