from django.test import TestCase, Client
from django.urls import reverse
from website.views import add_account, add_product

class SignInTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        add_account(0, "MaxLam", "passM", "Maxwell", "Lam", "123 Street", "102.10", "Cash")

    def test_signin(self):
        url = reverse('basic_login')
        loginCorrect = {
            'username': 'MaxLam',
            'password': 'passM'
        }

        wrongUsername = {
            'username': 'MaxLamWRONG',
            'password': 'passM'
        }

        wrongPassword = {
            'username': 'MaxLam',
            'password': 'passMWRONG'
        }

        responseCorrect = self.client.post(url, loginCorrect)
        self.assertEqual(responseCorrect.status_code, 200)

        responseIncorrectUsername = self.client.post(url, wrongUsername)
        self.assertEqual(responseIncorrectUsername.status_code, 401)

        responseIncorrectPassword = self.client.post(url, wrongPassword)
        self.assertEqual(responseIncorrectPassword.status_code, 401)

class productTest(TestCase):

    def setup(self):
        self.client = Client()
        add_product()