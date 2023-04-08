from django import forms


class SigninForm(forms.Form):
    username = forms.CharField(label='username', max_length=100)
    password = forms.CharField(label='password', max_length=100)


class MyForm(forms.Form):
    usernameForm = forms.CharField(label='Username')
    passwordForm = forms.CharField(label='Password')
