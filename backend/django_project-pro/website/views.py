from django.shortcuts import render, get_object_or_404
from .models import User, Product,ShoppingCartItem
from .forms import SigninForm, accountForm, deleteAccountForm, AddProductForm, RemoveProductForm
from django.http import JsonResponse
import random, secrets, string

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

#Delete later
def print_stuff(request):
    rowAll = User.objects.all()
    for oneRow in rowAll:
        print(oneRow.username)
    return render(request, 'userData.html', {'rowAll': rowAll})

def basic_login(request):
    if request.method == 'POST':
        form = SigninForm(request.POST)
        if form.is_valid():
            enteredUserName = form.cleaned_data['username']
            enteredPassword = form.cleaned_data['password']
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
                        print("Account Deleted")

def get_account_info(request):
    token = request.GET.get('token')
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

def add_product(request):
    if request.method == 'POST':
        form = AddProductForm(request.POST)
        if form.is_valid():
            product = Product(
                name=form.cleaned_data['name'],
                description=form.cleaned_data['description'],
                price=form.cleaned_data['price'],
                seller=form.cleaned_data['seller'],
                image_id=form.cleaned_data['image_id'],
                num_sales=form.cleaned_data['num_sales'],
                inventory=form.cleaned_data['inventory'],
                approval_status=form.cleaned_data.get('approval_status', 1),
                category=form.cleaned_data['category']
            )
            product.save()
            data = {
                'message': 'Product added successfully!'
            }
            return JsonResponse(data)
    else:
        form = AddProductForm()
    data = {
        'message': ''
    }
    return JsonResponse(data)

def remove_product(request):
    if request.method == 'DELETE':
        form = RemoveProductForm(request.GET)
        if form.is_valid():
            item_id = form.cleaned_data['item_id']
            try:
                product = Product.objects.get(id=item_id)
                product.delete()
                data = {'message': 'Product deleted successfully!'}
                return JsonResponse(data)
            except Product.DoesNotExist:
                return JsonResponse({'error': 'Product not found!'}, status=404)
        else:
            return JsonResponse({'error': 'Invalid parameters'}, status=400)

def get_shopping_cart_items(request):
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
                    'price': product.price,
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
        # If a non-GET request is made, return a 400 error
        data = {
            'error': 'Invalid request method'
        }
        return JsonResponse(data, status=400)

def add_cart_item(request, item_id):
    if request.method == 'POST':
        token = request.POST.get('token')
        user = get_object_or_404(User, token_id=token)
        product = get_object_or_404(Product, id=item_id)
        cart_item = ShoppingCartItem.objects.filter(shopping_cart_id=user.id, item_id=item_id).first()
        if cart_item:
            cart_item.quantity += 1
            cart_item.save()
        else:
            cart_item = ShoppingCartItem(shopping_cart_id=user.id, item_id=item_id, quantity=1)
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
