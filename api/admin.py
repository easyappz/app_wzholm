from django.contrib import admin

from .models import AuthToken, ChatMessage, Member


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "created_at", "updated_at")
    search_fields = ("username",)
    ordering = ("id",)


@admin.register(AuthToken)
class AuthTokenAdmin(admin.ModelAdmin):
    list_display = ("key", "member", "created_at")
    search_fields = ("key", "member__username")
    ordering = ("-created_at",)


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ("id", "member", "short_text", "created_at")
    search_fields = ("member__username", "text")
    ordering = ("-created_at",)

    def short_text(self, obj):  # type: ignore[no-untyped-def]
        if obj.text is None:
            return ""
        if len(obj.text) <= 30:
            return obj.text
        return f"{obj.text[:27]}..."

    short_text.short_description = "Text"  # type: ignore[attr-defined]
