from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # Добавьте свои поля, если нужно
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',  # Изменяем обратную ссылку
        blank=True,
       )
    user_permissions = models.ManyToManyField(
       'auth.Permission',
       related_name='custom_user_set',  # Изменяем обратную ссылку
       blank=True,
    )


    