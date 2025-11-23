from __future__ import annotations

import secrets

from django.contrib.auth.hashers import check_password
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import AuthToken, ChatMessage, Member
from .serializers import (
    ChatMessageSerializer,
    LoginSerializer,
    MemberSerializer,
    RegistrationSerializer,
)


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):  # type: ignore[no-untyped-def]
        serializer = RegistrationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        member = serializer.save()
        data = MemberSerializer(member).data
        return Response(data, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):  # type: ignore[no-untyped-def]
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]

        try:
            member = Member.objects.get(username=username)
        except Member.DoesNotExist:
            return Response(
                {"detail": "Неверное имя пользователя или пароль"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not check_password(password, member.password):
            return Response(
                {"detail": "Неверное имя пользователя или пароль"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        token = AuthToken.objects.filter(member=member).first()
        if token is None:
            token_key = self._generate_unique_token_key()
            token = AuthToken.objects.create(member=member, key=token_key)

        data = {
            "token": token.key,
            "member": MemberSerializer(member).data,
        }
        return Response(data, status=status.HTTP_200_OK)

    def _generate_unique_token_key(self) -> str:
        """Generate a unique token key for AuthToken."""

        while True:
            key = secrets.token_hex(20)
            if not AuthToken.objects.filter(key=key).exists():
                return key


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):  # type: ignore[no-untyped-def]
        member = request.user
        data = MemberSerializer(member).data
        return Response(data, status=status.HTTP_200_OK)


class ChatMessageListCreateView(APIView):
    """List and create messages in the global group chat."""

    def get_permissions(self):  # type: ignore[override]
        # Reading messages is public, posting requires authentication.
        if self.request.method == "POST":
            return [IsAuthenticated()]
        return [AllowAny()]

    def get(self, request):  # type: ignore[no-untyped-def]
        default_limit = 50
        limit_value = default_limit
        limit_param = request.query_params.get("limit")

        if limit_param is not None:
            try:
                parsed = int(limit_param)
                if 1 <= parsed <= 100:
                    limit_value = parsed
            except (TypeError, ValueError):
                limit_value = default_limit

        queryset = (
            ChatMessage.objects.select_related("member")
            .order_by("-created_at")[:limit_value]
        )
        messages = list(queryset)[::-1]
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):  # type: ignore[no-untyped-def]
        serializer = ChatMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        text = serializer.validated_data["text"]
        message = ChatMessage.objects.create(member=request.user, text=text)
        output_serializer = ChatMessageSerializer(message)
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)
