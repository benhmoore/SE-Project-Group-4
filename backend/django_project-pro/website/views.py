from django.shortcuts import render
from .models import User
from .forms import MyForm, SigninForm
from django.http import JsonResponse


def signin(request):
    # This is the boilerplate for the sign-in controller

    # The login request is a POST request
    if request.method == 'POST':

        # I'm using a form to validate the input
        form = SigninForm(request.POST)
        if form.is_valid():

            # Get username and password from form
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            print(username, password)  # For debugging

            # Check if the username and password match a user in the database

            # If they do, generate a session token and return it

            # Generate a session token
            # This is a random string that is used to identify the user
            # It is stored in the database and in the user's browser
            # The user's browser sends the session token to the server
            # The server uses the session token to identify the user

            # Algorithm steps:
            # 1. Generate a random string
            # 2. Check if the string already exists in the database (will need to add a "token" field in the user table)
            # 3. If it does, go back to step 1
            # 4. If it doesn't, save it to the database
            # 5. Add the token to the response

            token = 'fake-session-token'

            # Return success message as JSON
            return JsonResponse({'message': 'Success!', 'token': token}, status=200)


def print_stuff(request):
    rowAll = User.objects.all()
    for oneRow in rowAll:
        print(oneRow.username)
    return render(request, 'userData.html', {'rowAll': rowAll})


def basic_login(request):
    if request.method == 'POST':
        form = MyForm(request.POST)
        if form.is_valid():
            enteredUserName = form.cleaned_data['usernameForm']
            enteredPassword = form.cleaned_data['passwordForm']
            rowAll = User.objects.all()
            for oneRow in rowAll:
                if (oneRow.username == enteredUserName):
                    print("Username Found")
                    if (oneRow.password_hash == enteredPassword):
                        print("Correct Password - Login Successful")
                        return render(request, 'my_template.html', {'my_field': enteredUserName})
                    else:
                        print("Incorrect Password - Login Failed")
                else:
                    print("Username not found.")
            return render(request, 'my_form.html', {'form': form})
    else:
        form = MyForm()
    return render(request, 'my_form.html', {'form': form})
