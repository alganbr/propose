from django.db import models

# Create your models here.
class Tag(models.Model):
	description = models.CharField(
		max_length = 50,
		blank = False)