from django.contrib import admin
from .models import *

# Register your models here.
class TagAdmin(admin.ModelAdmin):
    model = Tag

admin.site.register(Tag, TagAdmin)
