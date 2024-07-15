from django.urls import path, include

from .views import MoviesListCreateView, MoviesListRetrieveView

urlpatterns = [
    path("movie-list/", MoviesListCreateView.as_view()),
    path("movie-list/<int:pk>", MoviesListRetrieveView.as_view()),
]
