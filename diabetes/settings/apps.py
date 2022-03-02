import os

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.admin',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',

    'apps.user',
    'apps.token',
    'apps.diabetes',
]

PHONENUMBER_DEFAULT_REGION = 'US'
