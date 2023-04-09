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
    token_id = models.CharField(max_length=255)


class Product(models.Model):
    category = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(decimal_places=2, max_digits = 10)
    seller = models.CharField(max_length=255)
    image_id = models.CharField(max_length=255)
    num_sales = models.IntegerField()
    inventory = models.IntegerField()
    approval_status = models.IntegerField()

class ShoppingCart(models.Model):
    user_id = models.IntegerField()
    order_status = models.IntegerField()

class ShoppingCartItem(models.Model):
    shopping_cart_id = models.IntegerField()
    product_id = models.IntegerField()
    quantity = models.IntegerField()
