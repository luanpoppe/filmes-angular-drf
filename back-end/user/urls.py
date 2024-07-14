from django.urls import path, include

from user.views import UserView, LoginView

urlpatterns = [
    path("create", UserView.as_view()),
    path("login", LoginView.as_view()),
]
