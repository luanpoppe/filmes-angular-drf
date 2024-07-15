from rest_framework import serializers
from .models import MovieLists

class MovieListsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieLists
        fields = "__all__"
class MovieListsSerializerGet(serializers.ModelSerializer):
    watchlist = serializers.SerializerMethodField()
    favorites = serializers.SerializerMethodField()

    class Meta:
        model = MovieLists
        fields = "__all__"

    def transformMovieIdsInList(self, idsAsString):
        movies = idsAsString.split(", ")  # Assuming watchlist is a string
        moviesAsNumbers = []
        for movie in movies:
            moviesAsNumbers.append(int(movie))
        return moviesAsNumbers
    
    def get_watchlist(self, obj):
        if self.context.get('request').method == 'GET':
            return self.transformMovieIdsInList(obj.watchlist)

        return obj
    def get_favorites(self, obj):
        if self.context.get('request').method == 'GET':
            return self.transformMovieIdsInList(obj.favorites)

        return obj