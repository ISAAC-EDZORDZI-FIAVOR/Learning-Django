from django.contrib import admin
from .models import *


class UserAdmin(admin.ModelAdmin):
    list_display = ('id',  'email', 'is_staff', 'is_superuser', 'is_active')
    list_filter = ('email', 'is_superuser')
    search_fields = ('username', 'email')


class FacultyTableList(admin.ModelAdmin):
   list_display = ('id', 'name')
   search_fields = ('id','name',)
    
    
admin.site.register(Faculty, FacultyTableList)
admin.site.register(Department)
admin.site.register(Programme)
admin.site.register(User, UserAdmin)
