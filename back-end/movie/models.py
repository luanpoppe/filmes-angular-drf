from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class MovieLists(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, unique=True)
    watchlist = models.CharField(null=True, blank=True)
    favorites = models.CharField(null=True, blank=True)