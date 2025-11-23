from django.db import models


class Member(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return self.username

    @property
    def is_authenticated(self) -> bool:
        """Return True so DRF can treat Member as an authenticated principal."""
        return True


class AuthToken(models.Model):
    key = models.CharField(max_length=40, unique=True)
    member = models.ForeignKey(
        "Member",
        related_name="tokens",
        on_delete=models.CASCADE,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.key} ({self.member.username})"


class ChatMessage(models.Model):
    member = models.ForeignKey(
        "Member",
        related_name="messages",
        on_delete=models.CASCADE,
    )
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self) -> str:
        preview = self.text[:20]
        return f"{self.member.username}: {preview}"
