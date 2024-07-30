from django.contrib import admin
from .models import User, Flowchart, Lecture
# Register your models here.
admin.site.register(User)
admin.site.register(Lecture)
admin.site.register(Flowchart)