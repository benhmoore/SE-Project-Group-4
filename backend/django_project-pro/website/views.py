from django.shortcuts import render, get_object_or_404
from .models import User
from .forms import SigninForm
from django.http import JsonResponse
import random
import secrets
import string


# def signin(request):
#     # This is the boilerplate for the sign-in controller
#
#     # The login request is a POST request
#     if request.method == 'POST':
#
#         # I'm using a form to validate the input
#         form = SigninForm(request.POST)
#         if form.is_valid():
#
#             # Get username and password from form
#             username = form.cleaned_data['username']
#             password = form.cleaned_data['password']
#             print(username, password)  # For debugging
#
#             # Check if the username and password match a user in the database
#
#             # If they do, generate a session token and return it
#
#             # Generate a session token
#             # This is a random string that is used to identify the user
#             # It is stored in the database and in the user's browser
#             # The user's browser sends the session token to the server
#             # The server uses the session token to identify the user
#
#             # Algorithm steps:
#             # 1. Generate a random string
#             # 2. Check if the string already exists in the database (will need to add a "token" field in the user table)
#             # 3. If it does, go back to step 1
#             # 4. If it doesn't, save it to the database
#             # 5. Add the token to the response
#
#             token = 'fake-session-token'
#
#             # Return success message as JSON
#             return JsonResponse({'message': 'Success!', 'token': token}, status=200)

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
    # else:
    #     form = SigninForm()
    # return render(request, 'my_form.html', {'form': form})
