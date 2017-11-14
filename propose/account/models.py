from django.db import models
from django.conf import settings

from tag.models import Tag

# Create your models here.
class Account(models.Model):
	class Meta:
		abstract = True

	user = models.OneToOneField(
		settings.AUTH_USER_MODEL,
		on_delete = models.CASCADE)

	profile_pic = models.ImageField(
		blank = True,
		upload_to = 'profile_pics')

	rating = models.PositiveIntegerField(
		blank = True,
		default = 3)

	def __str__(self):
		return self.user.username

class Freelancer(Account):
	bio = models.TextField(
		blank = True)

	resume = models.FileField(
		blank = True,
		upload_to = 'resumes')

	skills = models.ManyToManyField(
		Tag,
		blank = True)

class Client(Account):
	bio = models.TextField(
		blank = True)