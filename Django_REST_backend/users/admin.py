from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models


@admin.register(models.User)
class UserAdmin(UserAdmin):

    fieldsets = UserAdmin.fieldsets + (
        (
            "Custom Profile",
            {
                "fields": (
                    "authority",
                    "login_verified",
                    "login_ip",
                    "login_datetime",
                    "logout_datetime",
                )
            },
        ),
    )

    list_display = (
        "pk",
        "username",
        "email",
        "authority",
        "login_ip",
        "login_datetime",
        "is_login",
    )


@admin.register(models.UserSession)
class UserSessionAdmin(admin.ModelAdmin):
    list_display = (
        "pk",
        "user",
        "session_key",
        "created",
        "modified",
    )
