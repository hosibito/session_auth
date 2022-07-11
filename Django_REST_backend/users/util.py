from .models import User as user_models
from .serializers import UserSerializer

from django.core.cache import cache


def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip


def get_user_object_pk(pk):
    try:
        user = user_models.objects.get(pk=pk)
    except user_models.DoesNotExist:
        user = None

    return user


def get_Serialiser_user_data_pk(pk):
    try:
        user = user_models.objects.get(pk=pk)
        serializer = UserSerializer(user)
        seri_user = serializer.data
    except user_models.DoesNotExist:
        seri_user = None

    return seri_user


def get_user_object_username(username):
    try:
        user = user_models.objects.get(username=username)
    except user_models.DoesNotExist:
        user = None

    return user


def cash_set_user(username, set_data):
    cache.set(username, set_data, 5)


def cash_get_user(username):
    return cache.get(username)


def cash_delete_user(username):
    cache.delete(username)


def cash_set_ip(ip, set_data):
    cache.set(ip, set_data, 2)


def cash_get_ip(ip):
    return cache.get(ip)


def avoiding_duplicate_requests(request):
    client_ip = get_client_ip(request)

    if cash_get_ip(client_ip) == request.data:
        return True
    else:
        cash_set_ip(client_ip, request.data)
        return False
