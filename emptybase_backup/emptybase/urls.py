from django.urls import path
from django.views.generic.base import RedirectView

from emptybase.views import empty_func


favicon_view = RedirectView.as_view(url='/static/favicon.ico', permanent=True)
room_base_view = RedirectView.as_view(url='/', permanent=True)

urlpatterns = [
    path("favicon.ico", favicon_view),
    path("empty", empty_func, name='empty'),
]
