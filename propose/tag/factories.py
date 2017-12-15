import factory
from . import models

class TagFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Tag
        exclude = ['raw']

    raw = factory.Faker('word')
    name = factory.LazyAttribute(lambda tag: tag.raw.lower())
