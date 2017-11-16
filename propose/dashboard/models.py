from django.db import models

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
