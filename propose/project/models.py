from django.db import models

from account.models import Account
from dashboard.models import Dashboard
from tag.models import Tag

# Create your models here.
class Compensation(models.Model):
    currency = models.CharField(
        max_length = 3,
        blank = False)

    value = models.PositiveIntegerField(
        default = 0,
        blank = False)

    def __str__(self):
        return "{0} {1}".format(self.currency, self.value)

class Project(models.Model):
    client = models.ForeignKey(
        Account,
        on_delete = models.CASCADE,
        blank = False)

    client_dashboard = models.ForeignKey(
        Dashboard,
        related_name = "client",
        on_delete = models.CASCADE,
        blank = True,
        null = True)   # Belongs to a client dashboard once they accept an offer

    freelancer_dashboard = models.ForeignKey(
        Dashboard,
        related_name = "freelancer",
        on_delete = models.CASCADE,
        blank = True,
        null = True)   # Belongs to a freelancer once they accept an offer

    title = models.CharField(
        max_length = 50,
        blank = False)

    description = models.TextField(
        blank = False)

    tags = models.ManyToManyField(
        Tag,
        blank = True)

    compensation = models.OneToOneField(
        Compensation,
        blank = False)

    is_taken = models.BooleanField(
        default = False,
        blank = False)

    def __str__(self):
        return self.title

class Task(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete = models.CASCADE,
        blank = False)

    name = models.CharField(
        max_length = 50,
        blank = False)

    description = models.TextField(
        blank = False)

    is_complete = models.BooleanField(
        default = False,
        null = False,
        blank = False)

    def __str__(self):
        return self.name

class ProjectComment(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete = models.CASCADE,
        blank = False)

    user = models.ForeignKey(
        Account,
        on_delete = models.CASCADE,
        blank = False)

    comment = models.TextField(
        blank = False)

    timestamp = models.DateTimeField(
        auto_now_add = True,
        editable = False,
        blank = False)
