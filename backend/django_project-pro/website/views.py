from django.shortcuts import render, get_object_or_404
from .models import User, Product, ShoppingCart #ShoppingCartItem, Order, OrderItem, Seller, OrderStatus
from .forms import SigninForm, accountForm, deleteAccountForm, updateAccountForm , AddProductForm, RemoveProductForm
from django.http import JsonResponse
import random, secrets, string

def authenticate_request(request):
    """Authenticates requests that require a user to be logged in.

    Returns:
        integer: -1 if authentication fails, otherwise the user id
    """
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
        if(eachRow.token_id == token):
            return True

    # print("Token doesn't exist")
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
            print("ehllo")
            rowAll = User.objects.all()
            for oneRow in rowAll:
                if (oneRow.username == enteredUserName):
                    # print("Username Found")
                    if (oneRow.password_hash == enteredPassword):
                        # print("Correct Password - Login Successful")

                        tokenSwitch = True
                        while(tokenSwitch):
                            token = generate_random_string(100)
                            tokenSwitch = check_token(token)


                        edit_token(oneRow.id, token)
                        return JsonResponse({'message': 'Success!', 'token': token}, status=200)
            #If can't find username,
            return JsonResponse({'message': 'Authentication Failed'}, status=401)

def add_account(roleInput, usernameInput, passwordInput, firstInput, lastInput, addressInput, balanceInput, methodInput):

    tokenSwitch = True
    while (tokenSwitch):
        token = generate_random_string(100)
        tokenSwitch = check_token(token)

    newUser = User(
        user_role =roleInput,
        username=usernameInput,
        password_hash=passwordInput,
        first_name = firstInput,
        last_name = lastInput,
        address = addressInput,
        balance = balanceInput,
        payment_method = methodInput,
        token_id = token
    )

    newUser.save()
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

def get_account_info(request):
    token = request.GET.get('token')

    form = updateAccountForm(request.POST)
    if form.is_valid():
        matchingToken = form.cleaned_data['token']
        matching_payment_info = form.cleaned_data['payment_method']
        matching_address = form.cleaned_data['address']

        foundUser = User.objects.get(token_id = matchingToken)
        foundUser.address = matching_address
        foundUser.payment_method = matching_payment_info

        returnUser = {
            'id': foundUser.id,
            'user_role': foundUser.user_role,
            'username': foundUser.username,
            'first_name': foundUser.first_name,
            'last_name': foundUser.last_name,
            'address': foundUser.address,
            'balance': foundUser.balance,
            'payment_method': foundUser.payment_method,
            'token_id': foundUser.token_id
        }

        foundUser.save()
        return JsonResponse(returnUser, safe = False)

    allUsers = User.objects.all()
    for eachUser in allUsers:
        if (eachUser.token_id == token):
            returnUser = {
                'id': eachUser.id,
                'user_role': eachUser.user_role,
                'username': eachUser.username,
                'first_name': eachUser.first_name,
                'last_name': eachUser.last_name,
                'address': eachUser.address,
                'balance': eachUser.balance,
                'payment_method': eachUser.payment_method,
                'token_id': token
            }
            return JsonResponse(returnUser, safe = False)
    return JsonResponse({})
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

    return JsonResponse(products, safe = False)

def get_product_info(request):
    productID = request.GET.get('id')
    productID = int(productID)
    allProducts = Product.objects.all()
    for eachProduct in allProducts:
        if (eachProduct.id == productID):
            returnProduct = {
                'id': eachProduct.id,
                'category':eachProduct.category,
                'name':eachProduct.name,
                'description':eachProduct.description,
                'price': eachProduct.price,
                'seller': eachProduct.seller,
                'image_id': eachProduct.image_id,
                'num_sales': eachProduct.num_sales,
                'inventory': eachProduct.inventory,
                'approval_status': eachProduct.approval_status
            }
            return JsonResponse(returnProduct, safe=False)
    return JsonResponse({})

def return_user_cart(request):
    print("Accessing function!")
    allCarts = ShoppingCart.objects.all()
    for eachCart in allCarts:
        print(eachCart.user_id)
        # print(eachCart.id)

def add_product(request):
     if request.method == 'POST':
         form = AddProductForm(request.POST)
         if form.is_valid():
             product = Product(
                 category = form.cleaned_data['category'],
                 name=form.cleaned_data['name'],
                 price=form.cleaned_data['price'],
                 seller=form.cleaned_data['seller'],
                 image_id=form.cleaned_data['image_id'],
                 num_sales=form.cleaned_data['num_sales'],
                 inventory=form.cleaned_data['inventory'],
                 approval_status=form.cleaned_data['approval_status'],
                 description=form.cleaned_data['description'],

             )
             product.save()
             data = {
                 'message': 'Product added successfully!'
             }
             return JsonResponse(data)

def remove_product(request):
     if request.method == 'POST':
         form = RemoveProductForm(request.POST)
         if form.is_valid():
             product_id = form.cleaned_data['product_id']
             try:
                 product = Product.objects.get(id=product_id)
                 product.delete()
                 data = {'message': 'Product deleted successfully!'}
                 return JsonResponse(data)
             except Product.DoesNotExist:
                 return JsonResponse({'error': 'Product not found!'}, status=404)
         else:
             return JsonResponse({'error': 'Invalid parameters'}, status=400)

"""def get_shopping_cart_items(request):
    if request.method == 'GET':
        try:
            token = request.GET.get('token')
            user = User.objects.get(token_id=token)
            cart_items = ShoppingCartItem.objects.filter(shopping_cart_id=user.id)

            items = []
            for cart_item in cart_items:
                product = Product.objects.get(id=cart_item.item_id)
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
            return JsonResponse(data)
        except User.DoesNotExist:
            data = {
                'cartItems': []
            }
            return JsonResponse(data)
    else:
        data = {
            'error': 'Invalid request method'
        }
        return JsonResponse(data, status=400)

def add_cart_item(request, item_id):
    if request.method == 'POST':
        token = request.POST.get('token')
        user = get_object_or_404(User, token_id=token)
        product = get_object_or_404(Product, id=item_id)
        cart_item = ShoppingCartItem.objects.filter(shopping_cart_id=user.id, product=product).first()
        if cart_item:
            cart_item.quantity += 1
            cart_item.save()
        else:
            cart_item = ShoppingCartItem(shopping_cart_id=user.id, product=product, quantity=1)
            cart_item.save()
        cart_items = []
        for item in user.shoppingcartitem_set.all():
            cart_items.append({
                'id': item.id,
                'name': item.product.name,
                'description': item.product.description,
                'price': str(item.product.price),
                'image': item.product.image_id,
                'quantity': item.quantity
            })
        data = {
            'cartItems': cart_items
        }
        return JsonResponse(data)
    else:
        data = {
            'cartItems': []
        }
        return JsonResponse(data)

def remove_cart_item(request, item_id):
    if request.method == 'POST':
        token = request.POST.get('token')
        user = get_object_or_404(User, token_id=token)
        cart_item = get_object_or_404(ShoppingCartItem, id=item_id, shopping_cart_id=user.id)
        cart_item.delete()
        cart_items = []
        for item in user.shoppingcartitem_set.all():
            cart_items.append({
                'id': item.id,
                'name': item.product.name,
                'description': item.product.description,
                'price': str(item.product.price),
                'image': item.product.image_id,
                'quantity': item.quantity
            })
        data = {
            'cartItems': cart_items
        }
        return JsonResponse(data)
    else:
        data = {
            'cartItems': []
        }
        return JsonResponse(data)

def place_order(request):
    if request.method == 'POST':
        token = request.POST.get('token')
        user = get_object_or_404(User, token_id=token)
        cart = get_object_or_404(ShoppingCart, user=user)

        order = Order.objects.create(user=user, order_status=OrderStatus.PENDING)
        order_items = []
        for item in cart.items.all():
            order_item = OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity)
            order_items.append(order_item)

        cart.items.all().delete()

        data = {
            'cart_ID': order.id
        }
        return JsonResponse(data)
    else:
        data = {
            'cart_ID': -1
        }
        return JsonResponse(data, status=400)


def get_orders(request):
    if request.method == 'GET':
        try:
            token = request.GET.get('token')
            user = User.objects.get(token_id=token, is_seller=False)
            orders = ShoppingCart.objects.filter(user=user, order_status=1).order_by('-order_placed_date')

            carts = []
            for order in orders:
                order_items = ShoppingCartItem.objects.filter(shopping_cart=order)

                items = []
                for item in order_items:
                    product = item.product
                    item_dict = {
                        'id': product.id,
                        'name': product.name,
                        'description': product.description,
                        'price': str(product.price),
                        'image': product.image_id,
                        'quantity': item.quantity,
                    }
                    items.append(item_dict)

                cart_dict = {
                    'id': order.id,
                    'order_placed_date': order.order_placed_date,
                    'total_price': str(order.total_price),
                    'items': items,
                }
                carts.append(cart_dict)

            data = {
                'carts': carts,
            }
            return JsonResponse(data)
        except User.DoesNotExist:
            data = {
                'carts': [],
            }
            return JsonResponse(data)
    else:
        data = {
            'carts': [],
        }
        return JsonResponse(data)
       
def get_seller_products(request):
    if request.method == 'GET':
        try:
            token = request.GET.get('token')
            user = User.objects.get(token_id=token)

            products = Product.objects.filter(seller=user.username)

            data = {
                'products': list(products.values())
            }
            return JsonResponse(data)
        except (User.DoesNotExist, ValueError):
            data = {
                'products': []
            }
            return JsonResponse(data)
    else:
        data = {
            'error': 'Invalid request method'
        }
        return JsonResponse(data, status=400)

def edit_seller_product(request, product_id):
    if request.method == 'UPDATE':
        token = request.POST.get('token')
        seller = get_object_or_404(Seller, token_id=token)
        product = get_object_or_404(Product, id=product_id, seller=seller)
        
        if 'name' in request.POST:
            product.name = request.POST.get('name')
        if 'description' in request.POST:
            product.description = request.POST.get('description')
        if 'price' in request.POST:
            product.price = request.POST.get('price')
        if 'image_id' in request.POST:
            product.image_id = request.POST.get('image_id')
        if 'inventory' in request.POST:
            product.inventory = request.POST.get('inventory')
        if 'approval_status' in request.POST:
            product.approval_status = request.POST.get('approval_status')
        product.save()
        
        data = {
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': str(product.price),
            'seller': product.seller.username,
            'image': product.image_id,
            'num_sales': product.num_sales,
            'inventory': product.inventory,
            'approval_status': product.approval_status
        }
        return JsonResponse(data)
    else:
        data = {
            'products': []
        }
        return JsonResponse(data)

def delete_seller_product(request, product_id):
    if request.method == 'DELETE':
        token = request.GET.get('token')
        user = get_object_or_404(User, token_id=token, is_seller=True)
        product = get_object_or_404(Product, id=product_id, seller=user)
        product.delete()
        product_list = []
        for prod in user.product_set.all():
            product_list.append({
                'id': prod.id,
                'name': prod.name,
                'description': prod.description,
                'price': str(prod.price),
                'image': prod.image_id,
                'num_sales': prod.num_sales,
                'inventory': prod.inventory,
                'approval_status': prod.approval_status
            })
        data = {
            'products': product_list
        }
        return JsonResponse(data)
    else:
        data = {
            'products': []
        }
        return JsonResponse(data)"""

