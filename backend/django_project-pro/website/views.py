from django.shortcuts import render
from .models import User
from .forms import MyForm

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
