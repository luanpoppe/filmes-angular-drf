from rest_framework import views, generics
from movie.models import MovieLists
from movie.serializers import MovieListsSerializer, MovieListsSerializerGet
from rest_framework import status
from rest_framework.response import Response

class MoviesListCreateView(generics.ListCreateAPIView):
    queryset = MovieLists.objects.all()
    serializer_class = MovieListsSerializer

class MoviesListRetrieveView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MovieLists.objects.all()
    serializer_class = MovieListsSerializerGet