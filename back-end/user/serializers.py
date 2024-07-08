from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    def create(self, validated_data):
        user = User.objects.create_user(email=validated_data["email"], username=validated_data["username"], password=make_password(validated_data["password"]))

        return user

    class Meta:
        model = User
        fields = "__all__"