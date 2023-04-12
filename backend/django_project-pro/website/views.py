from django.shortcuts import render, get_object_or_404
from .models import User, Product, ShoppingCart, ShoppingCartItem
from .forms import SigninForm, accountForm, deleteAccountForm, updateAccountForm #, AddProductForm, RemoveProductForm
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




# def add_product(request):
#     if request.method == 'POST':
#         form = AddProductForm(request.POST)
#         if form.is_valid():
#             product = Product(
#                 name=form.cleaned_data['name'],
#                 description=form.cleaned_data['description'],
#                 price=form.cleaned_data['price'],
#                 seller=form.cleaned_data['seller'],
#                 image_id=form.cleaned_data['image_id'],
#                 num_sales=form.cleaned_data['num_sales'],
#                 inventory=form.cleaned_data['inventory'],
#                 approval_status=form.cleaned_data.get('approval_status', False)
#             )
#             product.save()
#             data = {
#                 'message': 'Product added successfully!'
#             }
#             return JsonResponse(data)
#     else:
#         form = AddProductForm()
#     return render(request, 'add_product.html', {'form': form})

# def remove_product(request, product_id):
#     if request.method == 'DELETE':
#         form = RemoveProductForm(request.GET)
#         if form.is_valid():
#             product_id = form.cleaned_data['product_id']
#             try:
#                 product = Product.objects.get(id=product_id)
#                 product.delete()
#                 data = {'message': 'Product deleted successfully!'}
#                 return JsonResponse(data)
#             except Product.DoesNotExist:
#                 return JsonResponse({'error': 'Product not found!'}, status=404)
#         else:
#             return JsonResponse({'error': 'Invalid parameters'}, status=400)




