from django import forms

class MyForm(forms.Form):
    usernameForm = forms.CharField(label='Username')
    passwordForm = forms.CharField(label='Password')
