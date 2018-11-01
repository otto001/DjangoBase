import os
import sys

from django.shortcuts import HttpResponse, redirect
from django.views.generic import TemplateView

from auto.django import get_client_ip, get_req_var


def empty_func(request):
    return HttpResponse("I'm feeling empty")
