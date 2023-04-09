from django.shortcuts import render, get_object_or_404
from .models import User, Product
from .forms import SigninForm
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
                    print("Username Found")
                    if (oneRow.password_hash == enteredPassword):
                        print("Correct Password - Login Successful")

                        tokenSwitch = True
                        while(tokenSwitch):
                            token = generate_random_string(100)
                            tokenSwitch = check_token(token)


                        edit_token(oneRow.id, token)
                        return JsonResponse({'message': 'Success!', 'token': token}, status=200)
            #If can't find username,
            return JsonResponse({'message': 'Authentication Failed'}, status=401)

def print_products(request):
    productAll = Product.Objects.all()
    for eachProduct in productAll:
        print(eachProduct.name)
