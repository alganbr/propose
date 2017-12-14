from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from account.models import Account

# Create your models here.
class Dashboard(models.Model):
    owner = models.ForeignKey(
        Account,
        on_delete = models.CASCADE,
        blank = False)   # Unowned dashboards are just lists of Projects

    # To distinguish between dashboards of complete projects and of ongoing projects
    is_completed_dashboard = models.BooleanField(
        default = False,
        blank = False)

# auto create dashboards when a user is created
@receiver(post_save, sender=Account)
def create_user_dashboards(sender, instance, created, **kwargs):
    if created:
        Dashboard.objects.create(owner=instance, is_completed_dashboard=False) # create working dashboard
        Dashboard.objects.create(owner=instance, is_completed_dashboard=True) # create completed dashboard