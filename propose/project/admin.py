from django.contrib import admin
from .models import *

# Register your models here.
class TaskInline(admin.TabularInline):
	model = Task

class ProjectAdmin(admin.ModelAdmin):
	model = Project
	inlines = (TaskInline, )

admin.site.register(Project, ProjectAdmin)