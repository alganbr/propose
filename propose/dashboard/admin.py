from django.contrib import admin
from .models import Dashboard

# Register your models here.
class DashboardAdmin(admin.ModelAdmin):
    model = Dashboard

admin.site.register(Dashboard, DashboardAdmin)
