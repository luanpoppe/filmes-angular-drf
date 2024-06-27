from rest_framework import serializers

from endpoint_teste.models import EndpointTesteModel

class EndpointTesteSerializer(serializers.ModelSerializer):
    class Meta:
        model = EndpointTesteModel
        fields = "__all__"