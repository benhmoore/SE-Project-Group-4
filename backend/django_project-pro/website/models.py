from django.db import models
from enum import Enum


# Create your models here.
class User(models.Model):
    user_role = models.IntegerField()
    username = models.CharField(max_length=255)
    password_hash = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    balance = models.DecimalField(decimal_places=2, max_digits=10)
    payment_method = models.CharField(max_length=255)
    token_id = models.CharField(max_length=255)


class Product(models.Model):
    category = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    seller = models.IntegerField()
    image_id = models.CharField(max_length=255)
    num_sales = models.IntegerField()
    inventory = models.IntegerField()
    approval_status = models.IntegerField()


class ShoppingCart(models.Model):
    user_id = models.IntegerField()
    order_status = models.IntegerField()
    order_placed_date = models.DateTimeField()

class userActivities(models.Model):
    user_id = models.IntegerField()
    action_description = models.CharField(max_length=255)

class ShoppingCartItem(models.Model):
    shopping_cart_id = models.IntegerField()
    product_id = models.IntegerField()
    quantity = models.IntegerField()

############################################################################

class OrderStatus(Enum):
    PENDING = 1
    PROCESSING = 2
    SHIPPED = 3
    DELIVERED = 4
    CANCELLED = 5


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shopping_cart = models.ForeignKey(ShoppingCart, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(decimal_places=2, max_digits=10)


class Seller(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.DecimalField(decimal_places=2, max_digits=10)
    payment_info = models.CharField(max_length=255)
