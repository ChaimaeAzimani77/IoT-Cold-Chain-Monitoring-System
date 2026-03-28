from rest_framework import serializers
from .models import Dht11

class DHT11serialize(serializers.ModelSerializer):
    dt_iso = serializers.SerializerMethodField()

    class Meta:
        model = Dht11
        fields = '__all__'

    def get_dt_iso(self, obj):
        return obj.dt.isoformat() if obj.dt else None
