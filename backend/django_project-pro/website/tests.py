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

    def test_add_product(self):
        url = reverse("add_product")
        form_data = {
            'category': 'Books',
            'name': 'The Great Gatsby',
            'price': 12.99,
            'seller': 1,
            'image_id': "ImageHere",
            'num_sales': 10,
            'inventory': 50,
            'approval_status': 1,
            'description': 'A classic novel by F. Scott Fitzgerald',
        }
        print(form_data)
        response = self.client.post(url, form_data)

        self.assertEqual(response.status_code, 200)
