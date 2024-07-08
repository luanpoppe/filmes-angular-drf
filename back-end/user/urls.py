from django.urls import path, include

from user.views import UserView

urlpatterns = [
    path("user", UserView.as_view()),
]
