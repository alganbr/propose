from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import *

# Register your models here.
class FreelancerAdmin(admin.ModelAdmin):
	model = Freelancer

admin.site.register(Freelancer, FreelancerAdmin)

class ClientAdmin(admin.ModelAdmin):
	model = Client

admin.site.register(Client, ClientAdmin)