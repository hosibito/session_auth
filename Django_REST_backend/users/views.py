import time

from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect

from django.contrib.auth import authenticate, login, logout

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status

from .models import User as user_model
from .serializers import UserSerializer, UserViewSerializer
from .permissions import IsSelf, IsManager
from .util import (
    get_client_ip,
    get_user_object_pk,
    cash_set_user,
    cash_get_user,
    cash_delete_user,
)


class UsersView(APIView):
    """
    매니저만 볼수있다.. 오늘 로그인한 유저만 보여져야한다. (로그인현황을 실시간으로 보여져야한다.)
    """

    permission_classes = [IsManager]

    def get(self, request):

        today = timezone.now().date()

        users = user_model.objects.filter(login_datetime__gte=today)

        serializer = UserSerializer(users, many=True)

        return Response(serializer.data)


class UserView(APIView):
    permission_classes = [IsSelf]

    def get(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "유저가 없습니다."})

        try:
            username = request.user.username

            reponse_data = cash_get_user(username)
            if reponse_data:
                print(f"캐시데이터 반환!! : {reponse_data}")
                return Response(reponse_data)

            user_pk = request.user.pk
            user = user_model.objects.get(pk=user_pk)
            serializer = UserSerializer(user)
            cash_set_user(username, serializer.data)
            print(f"일반데이터 캐쉬저장후 반환! : {serializer.data}")

            return Response(serializer.data)
        except Exception as e:
            print("UserView 에서 오류 발생 : ", e)
            return Response({"error": "서버오류입니다. 관리자에게 문의하세요."})


class SignupView(APIView):
    """
    {
        "username":"",
        "password":"",
        "re_password":""
    }
    """

    permission_classes = [permissions.AllowAny]

    @method_decorator(csrf_protect)
    def post(self, request):
        """
        {
            "username":"yamiyami",
            "password":"rlawldud",
            "re_password":"rlawldud"
        }
        """
        username = request.data.get("username")
        password = request.data.get("password")
        re_password = request.data.get("re_password")

        try:
            if not password == re_password:
                return Response({"error": "비밀번호가 일치하지 않습니다."})

            if user_model.objects.filter(username=username).exists():
                return Response({"error": "이미 존재하는 유저명입니다."})

            serializer = UserSerializer(
                data={"username": username, "password": password}
            )

            if serializer.is_valid() is False:
                return Response({"error": "데이터 검증에 실패했습니다. "})

            serializer.save()

            return Response({"success": "유저를 생성했습니다."})
        except Exception as e:
            print("SignupView 에서 오류 발생 : ", e)
            return Response({"error": "서버오류입니다. 관리자에게 문의하세요."})


class LoginView(APIView):
    """
    { "username":"","password":"" }
    """

    permission_classes = (permissions.AllowAny,)

    @method_decorator(csrf_protect)
    def post(self, request, format=None):
        username = request.data.get("username")
        password = request.data.get("password")

        try:
            user = authenticate(username=username, password=password)
            if user is None:
                return Response({"error": "이디가 없거나, 비번이 잘못되었습니다."})

            user.login_ip = get_client_ip(request)
            user.login_datetime = timezone.now()
            user.save()

            login(request, user=user)

            serializer = UserSerializer(user)

            cash_set_user(username, serializer.data)
            print(f"login합니다. 캐쉬에 {username} 저장  :: {cash_get_user(username)}")

            return Response({"success": "User authenticated"})

        except Exception as e:
            print("LoginView 에서 오류 발생 : ", e)
            return Response({"error": "로그인을 실패했습니다. 관리자에게 문의하세요."})


class LogoutView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        try:
            user = get_user_object_pk(request.user.pk)
            if user is None:
                print("permissions.IsAuthenticated 인데 유저가 None????")
                return Response({"error": "User is None"})

            # user.login_ip = ""
            user.logout_datetime = timezone.localtime()
            user.save()
            logout(request)

            cash_delete_user(user.username)
            print(
                f"logout 합니다. 캐쉬에 {user.username} 삭제  :: {cash_get_user(user.username)}"
            )

            return Response({"success": "Loggout Out"})

        except Exception as e:
            print("LogoutView 에서 오류 발생 : ", e)
            return Response({"error": "Something went wrong when logging out"})


class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    @method_decorator(ensure_csrf_cookie)
    def get(self, request, format=None):
        return Response({"success": "CSRF cookie set"})


# class RedisTestView(APIView):
#     def get(self, request):

#         now_time = timezone.now()

#         cache.set("redistest", "data!data!", 5)

#         while True:
#             time_interval = timezone.now() - now_time
#             cache_data = cache.get("redistest")

#             print(
#                 f"time_interval : {time_interval.seconds} , cache_data : {cache_data}"
#             )

#             if time_interval.seconds > 5:
#                 break
#             time.sleep(0.1)

#         for index in range(3):
#             now_time = timezone.now()
#             cache.set("redistest2", "data!data!", 5)

#             while True:
#                 time_interval = (timezone.now() - now_time).seconds
#                 if time_interval > 4:
#                     break

#                 cache_data = cache.get("redistest2")

#                 print(
#                     f"index: {index} time_interval : {time_interval} , cache_data : {cache_data}"
#                 )
#                 time.sleep(0.1)

#         time.sleep(1)
#         print(f" cache_data : {cache.get('redistest2')}")

#         return Response({"success": "Redis test over!"})
