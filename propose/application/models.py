from django.db import models

from account.models import Client, Freelancer
from project.models import Project

# Create your models here.
class WorkApplication(models.Model):
	creator = models.ForeignKey(
		Freelancer,
		blank = False)

	project = models.ForeignKey(
		Project)

	timestamp = models.DateTimeField(
		auto_now_add = True,
		editable = False,
		null = False,
		blank = False)

	is_accepted = models.BooleanField(
		default = False,
		blank = False)

	is_expired = models.BooleanField(
		default = False,
		blank = False)

class WorkOffer(models.Model):
	creator =  models.ForeignKey(
		Client,
		blank = False)

	freelancer = models.ForeignKey(
		Freelancer,
		blank = False)

	timestamp = models.DateTimeField(
		auto_now_add = True,
		editable = False,
		null = False,
		blank = False)

	is_accepted = models.BooleanField(
		default = False,
		blank = False)

	is_expired = models.BooleanField(
		default = False,
		blank = False)

