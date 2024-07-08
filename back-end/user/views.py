from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from user.serializers import UserSerializer
from django.contrib.auth.hashers import make_password

class UserView(ListCreateAPIView, RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if (serializer.is_valid()):
            print('request', request)
            print('request.data', request.data)
            print('\n\n\n\n')
            print('serializer.data', serializer.validated_data)
            serializer.save()
            # infoRecebida = request.data
            # User.objects.create(username=infoRecebida["username"], password=make_password(infoRecebida["password"]), email=infoRecebida["email"])

            return Response({
                "username": request.data["username"],
                "email": request.data["email"]
            })
            # return Response(serializer.data)
        else:
            return Response({
                "username": request.data["username"],
                "email": request.data["email"]
            })