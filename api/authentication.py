from __future__ import annotations

import typing as t

from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.request import Request

from .models import AuthToken


class TokenAuthentication(BaseAuthentication):
    """Simple token-based authentication using the Authorization header.

    Expected header format: ``Authorization: Token <key>``.
    """

    keyword = "Token"

    def authenticate(self, request: Request) -> t.Optional[t.Tuple[object, AuthToken]]:
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            auth_header = request.META.get("HTTP_AUTHORIZATION")

        if not auth_header or not isinstance(auth_header, str):
            return None

        parts = auth_header.split()
        if len(parts) != 2:
            return None

        keyword, key = parts
        if keyword != self.keyword:
            return None

        if not key:
            return None

        try:
            token = AuthToken.objects.select_related("member").get(key=key)
        except AuthToken.DoesNotExist as exc:  # pragma: no cover - straightforward
            raise AuthenticationFailed("Invalid token.") from exc

        member = token.member
        return member, token
