from django.db import models

from account.models import Client, Freelancer
from project.models import Project

# Create your models here.
class Dashboard(models.Model):
	client = models.ForeignKey(
		Client)

	freelancer = models.ForeignKey(
		Freelancer)

	project = models.ForeignKey(
		Project)