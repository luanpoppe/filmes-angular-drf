from django.db import models
from django.contrib.auth.models import User
from user_comments.models import MovieUserInfoModel

class MovieUserInfoModel(models.Model):
    movie_id = models.IntegerField()
    user_comment = models.ForeignKey(MovieUserInfoModel, on_delete=models.CASCADE)
    user_stars = models.FloatField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="movie_user_info")