from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import *
from .serializer import *
from rest_framework.authtoken.models import Token

class UserRegisterView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            email = request.data.get('email')
            password = request.data.get('password')
            if email is None or password is None:
                return Response({'error': 'Please provide both email and password'}, status=status.HTTP_400_BAD_REQUEST)
            user = authenticate(email=email, password=password)
            if not user:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    