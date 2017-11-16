from django.db import models
from django.conf import settings

from tag.models import Tag

# Create your models here.
class Account(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE)

    bio = models.TextField(
        blank = True)

    profile_pic = models.ImageField(
        blank = True,
        upload_to = 'profile_pics')

    rating = models.FloatField(
        blank = False,
        default = 3.0)

    # Freelancer-specific
    resume = models.FileField(
        blank = True,
        upload_to = 'resumes')

    skills = models.ManyToManyField(
        Tag,
        blank = True)

    def __str__(self):
        return self.user.username

class UserReview(models.Model):
    reviewee = models.ForeignKey(
        Account,
        related_name = "reviewee",
        on_delete = models.CASCADE,
        blank = False)

    reviewer = models.ForeignKey(
        Account,
        related_name = "reviewer",
        on_delete = models.CASCADE,
        blank = False)

    review = models.TextField(
        blank = False)

    rating = models.IntegerField(
        blank = False)

    timestamp = models.DateTimeField(
        auto_now_add = True,
        editable = False,
        blank = False)
