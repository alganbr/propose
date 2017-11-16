from django.db import models

from account.models import Account
from project.models import Project

# Create your models here.
class ApplicationDetails(models.Model):
    client = models.ForeignKey(
        Account,
        related_name = "client",
        on_delete = models.CASCADE,
        blank = False)

    project = models.ForeignKey(
        Project,
        on_delete = models.CASCADE,
        blank = False)

    freelancer = models.ForeignKey(
        Account,
        related_name = "freelancer",
        on_delete = models.CASCADE,
        blank = False)

    message = models.CharField(
        max_length = 2000,
        default = "",
        blank = False)

    timestamp = models.DateTimeField(
        auto_now_add = True,
        editable = False,
        null = False,
        blank = False)

class WorkApplication(models.Model):
    details = models.OneToOneField(
        ApplicationDetails,
        on_delete = models.CASCADE,
        blank = False)

    is_accepted = models.BooleanField(
        default = False,
        blank = False)

class WorkOffer(models.Model):
    details = models.OneToOneField(
        ApplicationDetails,
        on_delete = models.CASCADE,
        blank = False)

    application = models.OneToOneField(
        WorkApplication,
        on_delete = models.CASCADE,
        blank = False)

    is_accepted = models.BooleanField(
        default = False,
        blank = False)

    expire_time = models.DateTimeField(
        blank = False)

class WorkRequest(models.Model):
    details = models.OneToOneField(
        ApplicationDetails,
        on_delete = models.CASCADE,
        blank = False)

    is_accepted = models.BooleanField(
        default = False,
        blank = False)
