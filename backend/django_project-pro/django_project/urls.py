"""django_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView
from website.views import get_account_info, basic_login, create_account, delete_account, \
    print_products, get_product_info, \
    return_user_cart, add_product, remove_product, \
    add_cart_item, remove_cart_item

urlpatterns = [
    path('admin/', admin.site.urls),
    path("accounts/", include("django.contrib.auth.urls")),
    path('', TemplateView.as_view(template_name='home.html'), name='home'),

    path("user/signin", basic_login, name='basic_login'),
    path("user/create", create_account, name = 'create_account'),
    path("user/delete", delete_account, name = 'delete_account'),
    path("user", get_account_info, name = 'get_account_info'),

    path("products", get_product_info, name = 'get_product_info'),
    path('products/list', print_products, name = 'print_products'),

    path("cart", return_user_cart, name = 'return_user_cart'),

    path('products/add', add_product, name = 'add_product'),
    path('products/remove', remove_product, name = 'remove_product'),

    path('cart/add', add_cart_item, name = 'add_cart_item'),
    path('cart/remove', remove_cart_item, name = 'remove_cart_item'),




]
