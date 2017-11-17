from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import *

# Register your models here.
# which acts a bit like a singleton
class AccountInline(admin.StackedInline):
    model = Account

class UserAdmin(admin.ModelAdmin):
    model = User
    inlines = (AccountInline, )

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
