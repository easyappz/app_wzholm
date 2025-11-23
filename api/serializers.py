from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from .models import ChatMessage, Member


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ["id", "username", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Member
        fields = ["username", "password"]

    def validate_username(self, value):  # type: ignore[no-untyped-def]
        if Member.objects.filter(username=value).exists():
            raise serializers.ValidationError("A member with this username already exists.")
        return value

    def create(self, validated_data):  # type: ignore[no-untyped-def]
        password = validated_data.pop("password")
        hashed_password = make_password(password)
        member = Member.objects.create(password=hashed_password, **validated_data)
        return member


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)


class ChatMessageSerializer(serializers.ModelSerializer):
    member = MemberSerializer(read_only=True)

    class Meta:
        model = ChatMessage
        fields = ["id", "member", "text", "created_at"]
        read_only_fields = ["id", "member", "created_at"]
