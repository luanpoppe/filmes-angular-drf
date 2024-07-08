from rest_framework.decorators import api_view
from movie.models import MovieLists
from movie.serializers import MovieListsSerializer
from rest_framework import status
from rest_framework.response import Response

@api_view(["GET"])
def getUserWatchlist(request, pk):
    try:
        movieList = MovieLists.objects.get(pk=pk)
    except MovieLists.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MovieListsSerializer(movieList)
        print('movieList', movieList)
        print('movieList.data', movieList.data)
        return Response(serializer.data)

    # elif request.method == 'PUT':
    #     serializer = MovieListsSerializer(snippet, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # elif request.method == 'DELETE':
    #     snippet.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)