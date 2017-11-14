from django.db import models

from account.models import Client
from tag.models import Tag

# Create your models here.
class Compensation(models.Model):
	currency = models.CharField(
		max_length = 3,
		blank = False)

	value = models.PositiveIntegerField(
		default = 0,
		blank = False)

class Project(models.Model):
	owner = models.ForeignKey(
		Client,
		on_delete = models.CASCADE,
		blank = False)

	description = models.TextField(
		blank = False)

	compensation = models.ForeignKey(
		Compensation,
		blank = False)

	requirements = models.ManyToManyField(
		Tag)

	is_complete = models.BooleanField(
			default = False,
			null = False,
			blank = False)

class Task(models.Model):
	project = models.ForeignKey(
		Project,
		on_delete = models.CASCADE,
		blank = False)

	description = models.TextField(
		blank = False)

	is_complete = models.BooleanField(
		default = False,
		null = False,
		blank = False)