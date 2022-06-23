from django.contrib.auth.models import AbstractUser
from django.db import models

from django.conf import settings
from django.core.cache import cache
from importlib import import_module
from django.contrib.auth.signals import user_logged_in


from core import models as core_models


class User(AbstractUser):
    class Meta:
        ordering = ["-pk"]

    AUTHORITY_Manager = "매니저"
    AUTHORITY_Distributor = "총판"
    AUTHORITY_User = "유저"

    AUTHORITY_CHOICES = (
        (AUTHORITY_Manager, "매니저"),
        (AUTHORITY_Distributor, "총판"),
        (AUTHORITY_User, "유저"),
    )

    authority = models.CharField(
        max_length=12,
        choices=AUTHORITY_CHOICES,
        default=AUTHORITY_User,
    )
    login_verified = models.BooleanField(default=False)
    login_ip = models.CharField(max_length=20, default="", blank=True)
    login_datetime = models.DateTimeField(blank=True, null=True)
    logout_datetime = models.DateTimeField(blank=True, null=True)

    def is_login(self):
        return bool(cache.get(self.username))

    def __str__(self):
        return self.username


class UserSession(core_models.CoreModel):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, editable=False
    )
    session_key = models.CharField(max_length=40, editable=False)


SessionStore = import_module(settings.SESSION_ENGINE).SessionStore


def kicked_my_other_sessions(sender, request, user, **kwargs):
    print("kicked_my_other_sessions !! 유저 로그인시 실행됨!!!")
    for user_session in UserSession.objects.filter(user=user):
        session_key = user_session.session_key
        session = SessionStore(session_key)
        session.delete()

    session_key = request.session.session_key
    UserSession.objects.create(user=user, session_key=session_key)


user_logged_in.connect(kicked_my_other_sessions, dispatch_uid="user_logged_in")
