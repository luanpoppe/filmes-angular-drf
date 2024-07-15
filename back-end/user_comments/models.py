from datetime import datetime
from django.db import models
from django.contrib.auth.models import User

class MovieUserInfoModel(models.Model):
    movie_id = models.IntegerField()
    text = models.TextField()
    date = models.DateTimeField(default=datetime.now())
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)