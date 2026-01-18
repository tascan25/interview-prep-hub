from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
# Create your views here.

class TestAuthView(APIView):
    def get(self,req):
        return Response({"message":"Auth API is working"})
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,req):
        return Response({"message":"You are authenticated", "user":req.user.username})

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)