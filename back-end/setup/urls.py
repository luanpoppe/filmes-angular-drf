from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


from endpoint_teste.views import EndpointTesteViewSet

router = routers.DefaultRouter()
router.register("endpoint-teste", EndpointTesteViewSet, basename="Basename do endpoint-teste")

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include(router.urls)),
    path('user/', include("user.urls")),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
