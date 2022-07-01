from rest_framework import serializers
from .models import User as User_madels


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    is_hidden = serializers.BooleanField(write_only=True)

    class Meta:
        model = User_madels
        fields = (
            "id",
            "username",
            "password",
            "authority",
            "login_verified",
            "login_ip",
            "login_datetime",
            "logout_datetime",
            "is_login",
            "is_hidden",
        )
        read_only_fields = ("id",)

    def create(self, validated_data):
        password = validated_data.get("password")
        print("seri", validated_data)
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user


class UserViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_madels
        fields = ("id", "username")
