from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from endpoint_teste.views import EndpointTesteViewSet

router = routers.DefaultRouter()
router.register("endpoint-teste", EndpointTesteViewSet, basename="Basename do endpoint-teste")

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include(router.urls)),
    path('', include("user.urls")),
]
