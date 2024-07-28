from rest_framework import serializers
from .models import MovieUserInfoModel

class ss(serializers.ModelSerializer):
    class Meta:
        model = MovieUserInfoModel
        fields = "__all__"