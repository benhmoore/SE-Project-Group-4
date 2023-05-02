import datetime
from django.shortcuts import render, get_object_or_404
from .models import User, Product, ShoppingCart, ShoppingCartItem, Order, OrderItem, OrderStatus, Seller, userActivities
from .forms import SigninForm, accountForm, updateQuantity, \
    deleteAccountForm, updateAccountForm, AddProductForm, RemoveProductForm, \
    AddToCartForm, RemoveFromCartForm, ReturnOrderForm, actionForm
from django.http import JsonResponse
from django.utils import timezone
import random
import secrets
import string

def add_user_activity(inputID, inputAction):
    newAction = userActivities(
        user_id = inputID,
        action_description = inputAction,
    )

    newAction.save()
    return JsonResponse({'message': 'Logged Action added successfully!'}, status = 200)

def return_activities(request):
    if request.method == 'POST':
        user_id = authenticate_request(request)
        if user_id == -1:
            return JsonResponse({'error': 'Authentication failed.'}, status=401)

        # actionHistory = userActivities.objects.filter(user_id=user_id)
        actionHistory = userActivities.objects.all()

        actions = [{
            'user_id': eachAction.user_id,
            'action_description': eachAction.action_description
        } for eachAction in actionHistory]

        return JsonResponse(actions, safe=False)



def get_user_shopping_cart(user_id):
    shopping_cart = get_object_or_404(
        ShoppingCart, user_id=user_id, order_status=0)
    return shopping_cart


def get_user_from_shopping_cart(shopping_cart_id):
    shopping_cart = get_object_or_404(ShoppingCart, id=shopping_cart_id)
    user = get_object_or_404(User, id=shopping_cart.user_id)
    return user


def authenticate_request(request):
    """Authenticates requests that require a user to be logged in.

    Returns:
        integer: -1 if authentication fails, otherwise the user id
    """
    token = request.POST.get('token')
    if token is None:
        token = request.GET.get('token')
        if token is None:
            return -1
    try:
        user = User.objects.get(token_id=token)
        return user.id
    except User.DoesNotExist:
        return -1


def example_authenticated_route(request):
    """ Example of an authenticated route using the authenticate_request function. """

    user_id = authenticate_request(request)
    if user_id == -1:
        return JsonResponse({'message': 'Authentication Failed'}, status=401)

    # If the code reaches this point, the user is authenticated!
    # You can use the user_id to look up the user in the database
    # and use, return, or modify their data

    return JsonResponse({'message': 'Bla bla response info'}, status=200)


def edit_token(record_id, token):
    record = get_object_or_404(User, id=record_id)
    # Update record with new token
    record.token_id = token
    record.save()


def check_token(token):
    rowAll = User.objects.all()
    for eachRow in rowAll:
        if (eachRow.token_id == token):
            return True
    return False


def generate_random_string(length):
    alphabet = string.ascii_letters + string.digits
    password = ''.join(secrets.choice(alphabet) for i in range(length))
    return password


def basic_login(request):
    if request.method == 'POST':
        form = SigninForm(request.POST)
        if form.is_valid():
            enteredUserName = form.cleaned_data['username']
            enteredPassword = form.cleaned_data['password']
            rowAll = User.objects.all()
            for oneRow in rowAll:
                if (oneRow.username == enteredUserName):
                    if (oneRow.password_hash == enteredPassword):

                        tokenSwitch = True
                        while (tokenSwitch):
                            token = generate_random_string(100)
                            tokenSwitch = check_token(token)

                        edit_token(oneRow.id, token)

                        return JsonResponse({'message': 'Success!', 'token': token}, status=200)
            # If can't find username,
            return JsonResponse({'message': 'Authentication Failed'}, status=401)


def add_account(roleInput, usernameInput, passwordInput, firstInput, lastInput, addressInput, balanceInput, methodInput):

    tokenSwitch = True
    while (tokenSwitch):
        token = generate_random_string(100)
        tokenSwitch = check_token(token)

    newUser = User(
        user_role=roleInput,
        username=usernameInput,
        password_hash=passwordInput,
        first_name=firstInput,
        last_name=lastInput,
        address=addressInput,
        balance=balanceInput,
        payment_method=methodInput,
        token_id=token
    )
    newUser.save()

    # Create an empty cart for the user
    newCart = ShoppingCart(
        user_id=newUser.id,
        order_status=0,
        order_placed_date=timezone.now(),
    )
    newCart.save()

    return JsonResponse({'message': 'Success!', 'token': token}, status=200)

def create_account(request):
    if request.method == 'POST':
        form = accountForm(request.POST)
        if form.is_valid():
            userRole = form.cleaned_data['userRole']
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            firstName = form.cleaned_data['firstname']
            lastName = form.cleaned_data['lastname']
            address = form.cleaned_data['address']
            balance = form.cleaned_data['balance']
            payment_method = form.cleaned_data['payment_method']

            return add_account(userRole, username, password,
                               firstName, lastName, address, balance, payment_method)
        return JsonResponse({'message': 'Account Creation Failed'}, status=401)
    return JsonResponse({'message': 'Account Creation Failed'}, status=401)


def delete_account(request):
    if request.method == "POST":
        form = deleteAccountForm(request.POST)
        if form.is_valid():
            enteredUserName = form.cleaned_data['username']
            enteredPassword = form.cleaned_data['password']
            allUsers = User.objects.all()

            for oneRow in allUsers:
                if (oneRow.username == enteredUserName):
                    if (oneRow.password_hash == enteredPassword):
                        deleteAccount = User.objects.get(id=oneRow.id)
                        deleteAccount.delete()


def update_account_info(request):
    user_id = authenticate_request(request)
    if user_id == -1:
        return JsonResponse({'error': 'Authentication failed'}, status=401)

    if request.method == "POST":

        form = updateAccountForm(request.POST)
        if form.is_valid():
            matching_payment_info = form.cleaned_data['payment_method']
            matching_address = form.cleaned_data['address']
            foundUser = User.objects.get(id=user_id)
            foundUser.address = matching_address
            foundUser.payment_method = matching_payment_info
            foundUser.save()
            add_user_activity(user_id, "Update Account Info")
            return JsonResponse({'message': 'Success!'}, status=200)
    return JsonResponse({'message': 'Account Update Failed'}, status=401)


def get_account_info(request):
    user_id = authenticate_request(request)
    if user_id == -1:
        return JsonResponse({'error': 'Authentication failed'}, status=401)

    user = User.objects.get(id=user_id)
    returnUser = {
        'id': user.id,
        'user_role': user.user_role,
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'address': user.address,
        'balance': user.balance,
        'payment_method': user.payment_method,
        'token_id': user.token_id
    }

    add_user_activity(user_id, "Get Account Info")
    return JsonResponse(returnUser, safe=False, status=200)


def print_products(request):
    productAll = Product.objects.all()

    products = [{
        'id': eachProduct.id,
        'category': eachProduct.category,
        'name': eachProduct.name,
        'description': eachProduct.description,
        'price': eachProduct.price,
        'seller': eachProduct.seller,
        'image_id': eachProduct.image_id,
        'num_sales': eachProduct.num_sales,
        'inventory': eachProduct.inventory,
        'approval_status': eachProduct.approval_status
    } for eachProduct in productAll]

    return JsonResponse(products, safe=False)


def get_product_info(request):
    productID = request.GET.get('id')
    productID = int(productID)
    allProducts = Product.objects.all()
    for eachProduct in allProducts:
        if (eachProduct.id == productID):
            returnProduct = {
                'id': eachProduct.id,
                'category': eachProduct.category,
                'name': eachProduct.name,
                'description': eachProduct.description,
                'price': eachProduct.price,
                'seller': eachProduct.seller,
                'image_id': eachProduct.image_id,
                'num_sales': eachProduct.num_sales,
                'inventory': eachProduct.inventory,
                'approval_status': eachProduct.approval_status
            }
            return JsonResponse(returnProduct, safe=False, status=200)
    return JsonResponse({}, status=404)


def return_user_cart(request):
    user_id = authenticate_request(request)
    if user_id == -1:
        return JsonResponse({'error': 'Authentication failed'}, status=401)

    cart_items = []

    # Get a shopping cart by id
    cart_id = request.GET.get('cart_id')
    if cart_id is not None:
        shopping_cart = get_object_or_404(
            ShoppingCart, id=cart_id, user_id=user_id)
        for cart_item in ShoppingCartItem.objects.filter(shopping_cart_id=shopping_cart.id):
            product = get_object_or_404(Product, id=cart_item.product_id)
            cart_items.append({
                'id': cart_item.id,
                'product_id': cart_item.product_id,
                'name': product.name,
                'description': product.description,
                'price': str(product.price),
                'image': product.image_id,
                'quantity': cart_item.quantity
            })

        add_user_activity(user_id, "Return User Cart")

        return JsonResponse({
            'cartItems': cart_items,
            'order_status': shopping_cart.order_status,
            'order_placed_date': shopping_cart.order_placed_date,
        }, status=200)

    # Or, find active shopping cart
    for shopping_cart in ShoppingCart.objects.filter(user_id=user_id):
        if shopping_cart.order_status == 0:
            for cart_item in ShoppingCartItem.objects.filter(shopping_cart_id=shopping_cart.id):
                product = get_object_or_404(Product, id=cart_item.product_id)
                cart_items.append({
                    'id': cart_item.id,
                    'product_id': cart_item.product_id,
                    'name': product.name,
                    'description': product.description,
                    'price': str(product.price),
                    'image': product.image_id,
                    'quantity': cart_item.quantity
                })

    add_user_activity(user_id, "Get Cart Items")
    return JsonResponse({
        'cartItems': cart_items
    }, status=200)


def add_product(request):
    user_id = authenticate_request(request)
    if user_id == -1:
        return JsonResponse({'error': 'Authentication failed'}, status=401)

    if request.method == 'POST':
        form = AddProductForm(request.POST)
        if form.is_valid():
            product = Product(
                category="",
                name=form.cleaned_data['name'],
                price=form.cleaned_data['price'],
                seller=user_id,
                image_id=form.cleaned_data['image_id'],
                num_sales=0,
                inventory=form.cleaned_data['inventory'],
                approval_status=1,
                description=form.cleaned_data['description'],
            )
            product.save()
            add_user_activity(user_id, "Add Product")
            return JsonResponse({'message': 'Product added successfully!'}, status=200)

    return JsonResponse({'error': 'Invalid request'}, status=400)


def remove_product(request):
    if request.method == 'POST':
        form = RemoveProductForm(request.POST)
        if form.is_valid():
            product_id = form.cleaned_data['product_id']
            try:
                product = Product.objects.get(id=product_id)
                product.delete()
                data = {'message': 'Product deleted successfully!'}
                return JsonResponse(data, status=200)
            except Product.DoesNotExist:
                return JsonResponse({'error': 'Product not found!'}, status=404)
        else:
            return JsonResponse({'error': 'Invalid parameters'}, status=400)

######################################################################################################################################


def add_cart_item(request):
    user_id = authenticate_request(request)
    if user_id == -1:
        return JsonResponse({'error': 'Authentication failed'}, status=401)

    form = AddToCartForm(request.POST)
    if form.is_valid():
        item_id = form.cleaned_data['item_id']
        product = get_object_or_404(Product, id=item_id)
        shopping_cart = get_user_shopping_cart(user_id)
        cart_item = ShoppingCartItem.objects.filter(
            shopping_cart_id=shopping_cart.id, product_id=product.id).first()
        if cart_item:
            cart_item.quantity += 1
            cart_item.save()
        else:
            cart_item = ShoppingCartItem(
                shopping_cart_id=shopping_cart.id, product_id=product.id, quantity=1)
            cart_item.save()
        cart_items = []

        for shopping_cart in ShoppingCart.objects.filter(user_id=user_id):
            if shopping_cart.order_status == 0:
                for cart_item in ShoppingCartItem.objects.filter(shopping_cart_id=shopping_cart.id):
                    product = get_object_or_404(
                        Product, id=cart_item.product_id)
                    cart_items.append({
                        'id': cart_item.id,
                        'product_id': cart_item.product_id,
                        'name': product.name,
                        'description': product.description,
                        'price': str(product.price),
                        'image': product.image_id,
                        'quantity': cart_item.quantity
                    })

        data = {
            'cartItems': cart_items
        }
        add_user_activity(user_id, "Add Cart Item")
        return JsonResponse(data, status=200)
    else:
        data = {
            'cartItems': []
        }
        return JsonResponse(data, status=401)


def remove_cart_item(request):
    user_id = authenticate_request(request)
    if user_id == -1:
        return JsonResponse({'error': 'Authentication failed'}, status=401)

    form = RemoveFromCartForm(request.POST)
    if not form.is_valid():
        return JsonResponse({'error': 'Invalid input'}, status=400)

    item_id = form.cleaned_data['item_id']
    shopping_cart = get_user_shopping_cart(user_id)
    cart_item = get_object_or_404(
        ShoppingCartItem, id=item_id, shopping_cart_id=shopping_cart.id)
    cart_item.delete()
    cart_items = []

    for shopping_cart in ShoppingCart.objects.filter(user_id=user_id):
        if shopping_cart.order_status == 0:
            for cart_item in ShoppingCartItem.objects.filter(shopping_cart_id=shopping_cart.id):
                product = get_object_or_404(Product, id=cart_item.product_id)
                cart_items.append({
                    'id': cart_item.id,
                    'product_id': cart_item.product_id,
                    'name': product.name,
                    'description': product.description,
                    'price': str(product.price),
                    'image': product.image_id,
                    'quantity': cart_item.quantity
                })
    data = {
        'cartItems': cart_items
    }

    add_user_activity(user_id, "Remove Cart Item")
    return JsonResponse(data, status=200)


def get_shopping_cart_items(request):
    if request.method == 'GET':
        try:
            user = authenticate_request(request)
            if user == -1:
                data = {
                    'cartItems': []
                }
                return JsonResponse(data, status=401)

            cart_items = ShoppingCartItem.objects.filter(user_id=user)

            items = []
            for cart_item in cart_items:
                product = get_object_or_404(Product, id=cart_item.product_id)
                item_dict = {
                    'id': product.id,
                    'name': product.name,
                    'description': product.description,
                    'price': str(product.price),
                    'image': product.image_id,
                    'quantity': cart_item.quantity,
                }
                items.append(item_dict)

            data = {
                'cartItems': items
            }
            add_user_activity(user, "Get Shopping Cart Items")
            return JsonResponse(data, status=200)
        except Exception as e:
            data = {
                'error': str(e)
            }
            return JsonResponse(data, status=500)
    else:
        data = {
            'error': 'Invalid request method'
        }
        return JsonResponse(data, status=400)


def place_order(request):
    if request.method == 'POST':
        user_id = authenticate_request(request)
        if user_id == -1:
            return JsonResponse({'error': 'Authentication failed'}, status=401)

        # Update previous cart to order status
        # Get previous cart by order_status = 0

        existingCart = ShoppingCart.objects.filter(
            user_id=user_id, order_status=0).first()
        if existingCart:
            existingCart.order_status = 1
            existingCart.order_placed_date = timezone.datetime.now()

            cartItems = ShoppingCartItem.objects.filter(
                shopping_cart_id=existingCart.id)
            for cartItem in cartItems:
                product = Product.objects.filter(
                    id=cartItem.product_id).first()
                product.inventory -= cartItem.quantity
                product.num_sales += cartItem.quantity
                product.save()

            try:
                existingCart.save()
            except Exception as e:
                print("Error saving existing cart: " + str(e))

        # Create a new shopping cart for the user
        newCart = ShoppingCart(
            user_id=user_id, order_status=0, order_placed_date=timezone.datetime.now())
        newCart.save()

        add_user_activity(user_id, "Order Placed")
        return JsonResponse({'message': "Order Place Successfully"}, status=200)
    return JsonResponse({'error': "Invalid Input"}, status=401)


def update_quantity_cartItem(request):
    user_id = authenticate_request(request)
    if user_id == -1:
        return JsonResponse({'error': 'Authentication failed'}, status=401)

    form = updateQuantity(request.POST)
    if not form.is_valid():
        return JsonResponse({'error': 'Invalid input'}, status=400)

    item_id = form.cleaned_data['id']
    quantity = form.cleaned_data['quantity']

    shopping_cart = get_user_shopping_cart(user_id)
    cart_item = get_object_or_404(ShoppingCartItem,
                                  id=item_id, shopping_cart_id=shopping_cart.id)

    cart_item.quantity = quantity
    cart_item.save()
    add_user_activity(user_id, "Updated Quantity")
    return JsonResponse({'quantity': quantity}, status=200)


def get_orders(request):
    if request.method == 'GET':

        user = authenticate_request(request)
        if user == -1:
            return JsonResponse({'error': 'Authentication failed'}, status=401)

        orders = ShoppingCart.objects.filter(user_id=user, order_status__in=[
                                             1, 2]).order_by('-order_placed_date')
        carts = []
        for order in orders:
            order_items = ShoppingCartItem.objects.filter(
                shopping_cart_id=order.id)

            items = []
            for item in order_items:
                try:
                    product = get_object_or_404(Product, id=item.product_id)
                except Exception as e:
                    # If product doesn't exist, skip it
                    continue
                item_dict = {
                    'id': item.id,
                    'name': product.name,
                    'description': product.description,
                    'price': str(product.price),
                    'image': product.image_id,
                    'quantity': item.quantity,
                }
                items.append(item_dict)

            cart_dict = {
                'id': order.id,
                'order_status': order.order_status,
                'order_placed_date': order.order_placed_date,
                'items': items,
            }
            carts.append(cart_dict)
        data = {
            'carts': carts,
        }
        add_user_activity(user, "Get Order")
        return JsonResponse(data, status=200)
    else:
        data = {
            'error': 'Invalid request method'
        }
        return JsonResponse(data, status=400)


def return_order(request):
    if request.method == 'POST':
        user_id = authenticate_request(request)
        if user_id == -1:
            return JsonResponse({'error': 'Authentication failed'}, status=401)

        form = ReturnOrderForm(request.POST)
        if not form.is_valid():
            return JsonResponse({'error': 'Invalid input'}, status=400)

        cart_id = form.cleaned_data['order_id']

        shopping_cart = get_object_or_404(ShoppingCart, id=cart_id)
        shopping_cart.order_status = 2
        shopping_cart.save()
        add_user_activity(user_id, "Return Order")
        return JsonResponse({'message': "Order Returned Successfully"}, status=200)
    return JsonResponse({'error': "Invalid Input"}, status=400)


def get_seller_products(request):
    if request.method == 'GET':
        user_id = authenticate_request(request)
        if user_id == -1:
            return JsonResponse({'error': 'Authentication failed'}, status=401)

        product_id = request.GET.get('product_id')
        if product_id:
            product = get_object_or_404(Product, id=product_id, seller=user_id)
            data = {
                'products': [
                    {
                        'id': product.id,
                        'name': product.name,
                        'description': product.description,
                        'price': str(product.price),
                        'image': product.image_id,
                        'inventory': product.inventory,
                        'num_sales': product.num_sales,
                        'revenue': product.num_sales * product.price,
                        'seller': product.seller,
                    }
                ]
            }
            return JsonResponse(data, status=200)

        products = Product.objects.filter(seller=user_id)

        data = {
            'products': list(products.values())
        }

        add_user_activity(user_id, "Get Seller Products")
        return JsonResponse(data, status=200)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


def edit_seller_product(request):
    if request.method == 'POST':
        user_id = authenticate_request(request)
        if user_id == -1:
            return JsonResponse({'error': 'Authentication failed.'}, status=401)

        product_id = request.POST.get('product_id')
        product = get_object_or_404(Product, id=product_id, seller=user_id)
        if 'category' in request.POST:
            product.category = request.POST.get('category')
        if 'name' in request.POST:
            product.name = request.POST.get('name')
        if 'description' in request.POST:
            product.description = request.POST.get('description')
        if 'price' in request.POST:
            product.price = request.POST.get('price')
        if 'image_id' in request.POST:
            product.image_id = request.POST.get('image_id')
        if 'num_sales' in request.POST:
            product.num_sales = request.POST.get('num_sales')
        if 'inventory' in request.POST:
            if int(request.POST.get('inventory')) < 0:
                return JsonResponse({'error': 'Invalid inventory value'}, status=400)
            product.inventory = request.POST.get('inventory')
        if 'approval_status' in request.POST:
            product.approval_status = request.POST.get('approval_status')
        product.save()

        add_user_activity(user_id, "Update Seller Info")
        return JsonResponse({'message': 'Product updated successfully'}, status=200)

    return JsonResponse({'error': 'Invalid request method'}, status=400)


def delete_seller_product(request):
    if request.method == 'POST':
        user_id = authenticate_request(request)
        if user_id == -1:
            return JsonResponse({'error': 'Authentication failed.'}, status=401)

        product_id = request.POST.get('product_id')
        product = get_object_or_404(Product, id=product_id, seller=user_id)
        product.delete()

        add_user_activity(user_id, "Delete Seller Product")
        return JsonResponse({'message': 'Product deleted successfully'}, status=200)
    return JsonResponse({'error': 'Invalid request method'}, status=400)


def add_user_activity(inputID, inputAction):
    newAction = userActivities(
        user_id = inputID,
        action_description = inputAction,
    )

    newAction.save()
    return JsonResponse({'message': 'Logged Action added successfully!'}, status = 200)

def return_activities(request):
    if request.method == 'POST':
        user_id = authenticate_request(request)
        if user_id == -1:
            return JsonResponse({'error': 'Authentication failed.'}, status=401)

        # actionHistory = userActivities.objects.filter(user_id=user_id)
        actionHistory = userActivities.objects.all()

        actions = [{
            'user_id': eachAction.user_id,
            'action_description': eachAction.action_description
        } for eachAction in actionHistory]

        return JsonResponse(actions, safe=False)

###############################################################################################################################
def GetListofAccounts(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'Invalid request method.'}, status=400)

    user_id = authenticate_request(request)
    if user_id == -1:
        return JsonResponse({'error': 'Authentication failed'}, status=401)

    users = User.objects.all()

    user_list = []
    for user in users:
        user_dict = {
            'id': user.id,
            'user_role': user.user_role,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'address': user.address,
            'balance': str(user.balance),
            'payment_method': user.payment_method
        }
        user_list.append(user_dict)

    return JsonResponse({'users': user_list}, status=200)
