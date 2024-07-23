from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime
from django.contrib.auth.models import AbstractUser
from datetime import datetime
from django.contrib.postgres.fields import JSONField 



class User(AbstractUser):
    first_name = models.CharField(max_length=200, null=True)
    last_name = models.CharField(max_length=200, null=True)
    email = models.EmailField(unique=True, null=True)

    flowcharts = models.ManyToManyField("Flowchart", related_name="flowcharts", blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []  # No username required
    
class Flowchart(models.Model):
    name = models.CharField(max_length=50,null=True)
    description = models.CharField(max_length=100,null=True)
    date_created = models.CharField(max_length=50,null=True)
    data = models.JSONField(default=dict)

    image = models.ImageField(upload_to='flowcharts/', null=True, blank=True)

