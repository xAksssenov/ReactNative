from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.contrib.auth.models import User
from .models import CalculatorResult
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import status
from .serializers import LoginSerializer, RegisterSerializer, CalculatorResultSerializer

class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer

class CalculatorResultView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CalculatorResultSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CalculatorResultListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CalculatorResultSerializer

    def get_queryset(self):
        return CalculatorResult.objects.filter(user=self.request.user)

class LoginView(APIView):
    @swagger_auto_schema(
        request_body=LoginSerializer,
    )

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data.get("email")
        password = serializer.validated_data.get("password")
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Ошибка email или password"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=user.username, password=password)
        if not user:
            return Response({"error": "Ошибка email или password"}, status=status.HTTP_400_BAD_REQUEST)
        
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.auth.delete()
        return Response({'message': 'Выход выполнен успешно'})
