import os

from diabetes.utils.parser import parse_int

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',

        'NAME': os.getenv('POSTGRES_DB_NAME', 'diabetes'),
        'USER': os.getenv('POSTGRES_USERNAME', 'diabetes'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),

        'HOST': os.getenv('POSTGRES_HOSTNAME', 'localhost'),
        'PORT': parse_int(os.getenv('POSTGRES_PORT'), 5432),

        'CONN_MAX_AGE': 60 * 60  # 1 hour
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
