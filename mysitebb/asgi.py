# NOTE: by ddefault we get
# import os

# from django.core.asgi import get_asgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysitebb.settings')

# application = get_asgi_application()


# NOTE: just copied and paste https://channels.readthedocs.io/en/stable/installation.html#installation
import os

from django.core.asgi import get_asgi_application
# from channels.routing import get_default_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysitebb.settings')        # don't forget to give this line...mysitebb is our project name....NOTE: by default here something else comes....remember...https://channels.readthedocs.io/en/latest/deploying.html#configuring-the-asgi-application

# import django
# django.setup()
from django import setup
setup()


from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter,URLRouter
from chatbb.routingbb import ws_applicationbb 


django_asgi_app = get_asgi_application()


application = ProtocolTypeRouter({
    # "http": get_asgi_application(),
    "http": django_asgi_app,
    # "http": get_default_application(),
    # Just HTTP for now. (We can add other protocols later.)
    'websocket':AuthMiddlewareStack(
            URLRouter(
                ws_applicationbb
            )
        )
})



