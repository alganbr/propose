import factory
from . import models
from account.factories import AccountFactory
from project.factories import ProjectFactory

# Untested

class ApplicationDetailFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.ApplicationDetail

    client = factory.SubFactory(AccountFactory)
    project = factory.SubFactory(ProjectFactory)
    freelancer = factory.SubFactory(AccountFactory)

class WorkApplicationFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.WorkApplication

    details = factory.SubFactory(ApplicationDetailFactory)

class WorkOfferFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.WorkOffer

    details = factory.SubFactory(ApplicationDetailFactory)
    application = factory.SubFactory(WorkApplicationFactory)
    expire_time = factory.Faker('date_time_this_year', before_now=False, after_now=True)

class WorkRequestFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.WorkRequest

    details = factory.SubFactory(ApplicationDetailFactory)
