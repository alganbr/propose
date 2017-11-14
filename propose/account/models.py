from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from tag.models import Tag

# Create your models here.
class Account(models.Model):
	user = models.OneToOneField(
		settings.AUTH_USER_MODEL,
		on_delete = models.CASCADE)

	profile_pic = models.ImageField(
		blank = True,
		upload_to = 'profile_pics')

	rating = models.PositiveIntegerField(
		blank = True,
		default = 3)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
	if created:
		Account.objects.create(user=instance)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_user_profile(sender, instance, **kwargs):
	instance.account.save()

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