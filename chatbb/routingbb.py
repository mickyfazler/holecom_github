from django.urls import path

from django.urls.conf import re_path

from .consumersbb import VideoChatConsumerbb

# ws_applicationbb=[
ws_applicationbb=[
    # path('wsbb/',VideoChatConsumerbb.as_asgi())
    path('',VideoChatConsumerbb.as_asgi())  
]