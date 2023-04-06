from django.db import models

# Create your models here.
class User(models.Model):
    user_role = models.IntegerField()
    username = models.CharField(max_length=255)
    password_hash = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    balance = models.DecimalField(decimal_places=2, max_digits = 10)
    payment_method = models.CharField(max_length=255)