from django.urls import path
from . import views

app_name = "users"

urlpatterns = [
    path("", views.UsersView.as_view()),
    path("signup", views.SignupView.as_view()),
    # path("authenticated", CheckAuthenticatedView.as_view()),
    # path("register", SignupView.as_view()),
    path("login", views.LoginView.as_view()),
    path("logout", views.LogoutView.as_view()),
    # path("delete", DeleteAccountView.as_view()),
    path("user", views.UserView.as_view()),
    path("csrf_cookie", views.GetCSRFToken.as_view()),
    # path("redis_test", views.RedisTestView.as_view()),
    path("users", views.UsersView.as_view()),
]
