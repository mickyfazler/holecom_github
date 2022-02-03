from django.urls import path,include
from .views import *

urlpatterns = [
    # path('', mainFuncbb()),       #NOTE: IT'S WRONG
    path('', mainFuncbb),
]
