from django.contrib import admin
from django.contrib import admin
from .models import Todo

class TodoAdmin(admin.ModelAdmin):
    list_display = ('task', 'completed')

admin.site.register(Todo, TodoAdmin)