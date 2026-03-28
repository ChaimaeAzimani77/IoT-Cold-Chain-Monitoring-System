from django.urls import path
from . import views
from . import api


urlpatterns = [
    path("api/", api.Dlist, name='api_list'),
    path("api/post/", api.Dhtviews.as_view(), name='api_post'),
    path("api/by-date/", api.data_by_date, name="data_by_date"), # Pour la recherche par date

    path("", views.dashboard, name="dashboard"),
    path("latest/", api.latest_json, name="latest_json"),
    path("graph_temp/", views.graph_temp, name="graph_temp"),
    path("graph_hum/", views.graph_hum, name="graph_hum"),

]