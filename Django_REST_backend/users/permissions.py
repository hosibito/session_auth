from rest_framework.permissions import BasePermission

from .util import (
    get_Serialiser_user_data_pk,
    get_client_ip,
    cash_set_user,
    cash_get_user,
)


class IsSelf(BasePermission):
    """
    리퀘스트 유저가 자기 자신인지 확인한다.
    확인할때 캐쉬에서 값을 가져오고 캐쉬에 값이 없다면 캐쉬에 값을 저장한다.
    캐쉬타임을.. 주는게 좋을까?..
    """

    def has_permission(self, request, view):
        username = request.user.username
        login_ip = get_client_ip(request)

        siri_user = cash_get_user(username)
        if siri_user is None:
            siri_user = get_Serialiser_user_data_pk(request.user.pk)
        #     print("IsSelf 호출", siri_user, login_ip)
        # else:
        #     print("IsSelf 호출(캐시)", siri_user, login_ip)

        if siri_user is None:
            print("IsSelf : 유저정보가 없어서 조회불가..")
            return False

        if not request.user.username == siri_user.get("username"):
            print("IsSelf : 리퀘스트 유저와 DB유저가 다름!!")
            return False

        if not siri_user.get("login_ip") == login_ip:
            print("IsSelf : 유저가 아이피가 로그인한 아이피가 아님!!")
            return False

        cash_set_user(username, siri_user)
        return True

    # def has_object_permission(self, request, view, pk_user):
    #     login_ip = get_client_ip(request)
    #     print("IsSelf has_object_permission 호출", pk_user, login_ip)

    #     if not request.user.username == pk_user.username:
    #         print("리퀘스트 유저와 DB유저가 다름!!")
    #         return False

    #     if not pk_user.login_ip == login_ip:
    #         print("유저가 아이피가 로그인한 아이피가 아님!!")
    #         return False

    #     return True


class IsManager(BasePermission):
    def has_permission(self, request, view):
        username = request.user.username
        login_ip = get_client_ip(request)

        siri_user = cash_get_user(username)
        if siri_user is None:
            siri_user = get_Serialiser_user_data_pk(request.user.pk)
        #     print("IsManager 호출", siri_user, login_ip)
        # else:
        #     print("IsManager 호출(캐시)", siri_user, login_ip)

        if siri_user is None:
            print("IsManager : 유저정보가 없어서 조회불가..")
            return False

        if not request.user.username == siri_user.get("username"):
            print("IsManager : 리퀘스트 유저와 DB유저가 다름!!")
            return False

        if not siri_user.get("login_ip") == login_ip:
            print("IsManager : 유저가 아이피가 로그인한 아이피가 아님!!")
            return False

        if not siri_user.get("authority") == "매니저":
            print("IsManager : 유저가 매니저가 아닌데 들어온다고?!?!?")
            return False

        cash_set_user(username, siri_user)
        return True

    # def has_object_permission(self, request, view, user):
    #     print("IsManager has_object_permission 호출")
    #     login_ip = get_client_ip(request)

    #     if request.user.username == user.username:
    #         if user.login_ip == login_ip:
    #             return True
    #         else:
    #             # 유저가 뭔가 이상한 짓을 햇음!
    #             return False
    #     else:
    #         return False
