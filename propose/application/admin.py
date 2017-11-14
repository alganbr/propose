from django.contrib import admin

from .models import *

# Register your models here.
class WorkApplicationAdmin(admin.ModelAdmin):
	model = WorkApplication

admin.site.register(WorkApplication, WorkApplicationAdmin)

class WorkOfferAdmin(admin.ModelAdmin):
	model = WorkOffer

admin.site.register(WorkOffer, WorkOfferAdmin)