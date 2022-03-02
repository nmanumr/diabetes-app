import re
from random import randint

from django.conf import settings

from diabetes.utils.strings import generate_random_string


def suggest_username(email):
    username = email.split('@', 1)[0]
    username = re.sub(r'[^A-Za-z0-9.]', '_', username).strip('_')
    username = re.sub(r'_+', '_', username)

    if len(username) < settings.USERNAME_MIN_LENGTH:
        username += generate_random_string(settings.USERNAME_MIN_LENGTH - len(username))

    guess = username
    from apps.user.models import User

    while User.objects.filter(username__iexact=guess).exists():
        guess = f'{username}_{randint(1111, 7777)}'

    return guess
