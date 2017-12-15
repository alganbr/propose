from django.contrib import admin
from .models import *

# Register your models here.
class CompensationAdmin(admin.ModelAdmin):
    model = Compensation

admin.site.register(Compensation, CompensationAdmin)

class TaskInline(admin.TabularInline):
    model = Task

class ProjectCommentInline(admin.TabularInline):
    model = ProjectComment

class ProjectAdmin(admin.ModelAdmin):
    model = Project
    inlines = (TaskInline, ProjectCommentInline, )

admin.site.register(Project, ProjectAdmin)
