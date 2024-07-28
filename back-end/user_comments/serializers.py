from rest_framework import serializers
from .models import UserCommentsModel

class ss(serializers.ModelSerializer):
    class Meta:
        model = UserCommentsModel
        fields = "__all__"