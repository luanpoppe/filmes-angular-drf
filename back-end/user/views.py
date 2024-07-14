# from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import views, permissions
from rest_framework.exceptions import AuthenticationFailed
from user.serializers import UserSerializer
# from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken

class UserView(views.APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            temp = serializer.data
            del temp["password"]
            return Response(temp)
        return Response({"oi": "ola"})

class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("Usuário não encontrado")
        
        if not user.check_password(password):
            raise AuthenticationFailed("Senha incorreta")
        
        refresh = RefreshToken.for_user(user)
        response = Response()
        
        response.set_cookie(key="token", value=str(refresh), httponly=True)
        
        response.data = {
            "token": str(refresh)
        }
        return response

# class UserView(ListCreateAPIView, RetrieveUpdateDestroyAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = UserSerializer(data=request.data)
#         if (serializer.is_valid()):
#             print('request', request)
#             print('request.data', request.data)
#             print('\n\n\n\n')
#             print('serializer.data', serializer.validated_data)
#             serializer.save()
#             # infoRecebida = request.data
#             # User.objects.create(username=infoRecebida["username"], password=make_password(infoRecebida["password"]), email=infoRecebida["email"])

#             return Response({
#                 "username": request.data["username"],
#                 "email": request.data["email"]
#             })
#             # return Response(serializer.data)
#         else:
#             return Response({
#                 "username": request.data["username"],
#                 "email": request.data["email"]
#             })