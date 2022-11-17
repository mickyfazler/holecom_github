from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-feas2ka+1q5(!+!rc%d%n16(un=7qk4w*cnxycp=-s4fq=r&#l'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False           # Error 500 with debug=False, but no error with debug=True then run 'python manage.py collectstatic' own explore:
# DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1','.holecom.com','holecomb.herokuapp.com','web-production-807b.up.railway.app']
# ALLOWED_HOSTS = ['*']
CSRF_TRUSTED_ORIGINS = ['https://holecomb.herokuapp.com','https://web-production-807b.up.railway.app']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'chatbb',
    'channels',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'mysitebb.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]



# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

# MY CODE BABY
# NOTE:this is for heroku
""" DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'dalh82fturasdi',
        'USER': 'ecxtwodyqjdsyl',
        'PASSWORD': 'e6c8c8605b012e92db6944467c63ce0d3608c80f7d1a301ec135949603a0814d',
        'HOST': 'ec2-3-227-118-10.compute-1.amazonaws.com',
        'PORT': '5432',
    }
}
 """

DATABASES = {
    'default': {
        #'ENGINE': 'django.db.backends.sqlite3',
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'railway',
        'USER': 'postgres',
        'PASSWORD': '1wSUSK5HU4ShrjFeeEyJ',
        'HOST': 'containers-us-west-64.railway.app',
        'PORT': '6382',
    }
}


# it wass need with heroku database
# import  dj_database_url     # here it's dj_datatabase_url but in requirements.txt dj-datatabase-url remember NOTE:
    
# db_from_env= dj_database_url.config(conn_max_age=600)
# DATABASES['default'].update(db_from_env)

# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


WSGI_APPLICATION = 'mysitebb.wsgi.application'
ASGI_APPLICATION = 'mysitebb.asgi.application'


# NOTE: if forget then D:\Coding Playground\Geekyshows Django Code\All codes\31\mnprog3\settings.py
import os
# STATIC_DIR=os.path.join(BASE_DIR,"staticzz")              # it did not work that means name must be 'static; own explore:
STATIC_DIR=os.path.join(BASE_DIR,"static")              # Adding static folder.....Remember
STATICFILES_DIRS=[STATIC_DIR]           # You must need to give it ....files and dirs ...not file and dir....Remember
STATIC_ROOT=os.path.join(BASE_DIR,'staticfiles')
# STATIC_URL='/static/'


# import django_heroku
# his(tauhid) code  https://channels.readthedocs.io/en/latest/topics/channel_layers.html#in-memory-channel-layer
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
# CHANNEL_LAYERS = {
#     "default": {
#         "BACKEND": "channels.layers.InMemoryChannelLayer"
#     }
# } 




CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            # "hosts": [os.environ.get('REDIS_URL'),os.environ.get('7630'))],
            "hosts": [os.environ.get('REDIS_URL', 'redis://localhost:7630')],
            # "hosts": [('containers-us-west-85.railway.app','redis://containers-us-west-85.railway.app:7630')]
        },
    },
}



# CHANNEL_LAYERS = {
#     "default": {
#         "BACKEND": "channels_redis.core.RedisChannelLayer",
#         "CONFIG": {
#             "hosts": [("redis://default:Oik9KXvvNEyZDUO6ZsnG@containers-us-west-85.railway.app", 7630)], 
#         },
#     },
# }