from .models import Dht11
from .serializers import DHT11serialize
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .utils import send_telegram
from django.http import JsonResponse
from twilio.rest import Client
from datetime import date

# ==== Suivi des alertes par jour ====
dernieres_alertes = {}  # { "YYYY-MM-DD": True }

@api_view(['GET'])
def Dlist(request):
    all_data = Dht11.objects.all()
    data = DHT11serialize(all_data, many=True).data
    return Response({'data': data})

class Dhtviews(generics.CreateAPIView):
    queryset = Dht11.objects.all()
    serializer_class = DHT11serialize

    def perform_create(self, serializer):
        instance = serializer.save()
        temp = instance.temp
        aujourd_hui = date.today().isoformat()

        if temp > 2:
            # On vérifie si on a déjà envoyé une alerte aujourd'hui
            if not dernieres_alertes.get(aujourd_hui, False):

                # 1) Email
                try:
                    send_mail(
                        subject="⚠️ Alerte Température élevée",
                        message=f"La température a dépassé 19°C : {temp:.1f}°C à {instance.dt}",
                        from_email=settings.EMAIL_HOST_USER,
                        recipient_list=["nom.prenom@gmail.com"],
                        fail_silently=True,
                    )
                except Exception as e:
                    print("Erreur email:", e)

                # 2) Telegram
                msg = f"⚠️ Alerte DHT11: {temp:.1f}°C à {instance.dt}"
                try:
                    send_telegram(msg)
                except Exception as e:
                    print("Erreur Telegram:", e)



# ======================================
def latest_json(request):
    obj = Dht11.objects.last()
    if not obj:
        return JsonResponse({"error": "no data"}, status=404)
    
    return JsonResponse({
        "temperature": obj.temp,
        "humidity": obj.hum,
        "timestamp": obj.dt.isoformat()
    })

@api_view(['GET'])
def data_by_date(request):
    date_req = request.GET.get('date')  # format : YYYY-MM-DD

    if not date_req:
        return Response({"error": "date manquante"}, status=400)

    data = Dht11.objects.filter(
        dt__date=date_req
    ).order_by('dt')

    return Response({
        "labels": [d.dt.strftime("%H:%M") for d in data],
        "temperature": [d.temp for d in data],
        "humidity": [d.hum for d in data],
    })
