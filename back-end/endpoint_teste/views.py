from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

from endpoint_teste.models import EndpointTesteModel
from endpoint_teste.serializer import EndpointTesteSerializer
# Create your views here.

class EndpointTesteViewSet(viewsets.ModelViewSet):
    """Mostrará todas as tarefas"""
    queryset = EndpointTesteModel.objects.order_by("id").all()
    serializer_class = EndpointTesteSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ["id"]