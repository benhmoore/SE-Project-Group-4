from django.test import TestCase, Client
from django.urls import reverse
from django.http import JsonResponse
from website.views import add_account, add_product
import json

class SignInTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        add_account(0, "MaxLam", "passM", "Maxwell", "Lam", "123 Street", "102.10", "Cash")

    def test_correct_info(self):
        url = reverse('basic_login')
        loginCorrect = {
            'username': 'MaxLam',
            'password': 'passM'
        }

        responseCorrect = self.client.post(url, loginCorrect)
        self.assertEqual(responseCorrect.status_code, 200)

    def test_incorrect_username_correctPassword(self):
        url = reverse('basic_login')
        wrongUsername = {
            'username': 'MaxLamWRONG',
            'password': 'passM'
        }

        responseIncorrectUsername = self.client.post(url, wrongUsername)
        self.assertEqual(responseIncorrectUsername.status_code, 401)

    def test_correct_username_incorrectPassword(self):
        url = reverse('basic_login')
        wrongPassword = {
            'username': 'MaxLam',
            'password': 'passMWRONG'
        }

        responseIncorrectPassword = self.client.post(url, wrongPassword)
        self.assertEqual(responseIncorrectPassword.status_code, 401)

    def test_incorrectUsername_incorrectPassword(self):
        url = reverse('basic_login')
        justWrong = {
            'username': 'MaxLamWRONG',
            'password': 'passMWRONG'
        }

        responseIncorrectPassword = self.client.post(url, justWrong)
        self.assertEqual(responseIncorrectPassword.status_code, 401)

class productTest(TestCase):

    def setup(self):
        self.client = Client()

    def test_add_product(self):
        #Grab JSON response which includes token
        tokenData = add_account(0, "MaxLam", "passM", "Maxwell", "Lam", "123 Street", "102.10", "Cash")
        data = json.loads(tokenData.content)
        chosenToken = data['token']

        url = reverse("add_product")
        form_data = {
            'token': chosenToken, #Uses token
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

        response = self.client.post(url, form_data)
        self.assertEqual(response.status_code, 200)

    def test_no_auth(self):
        url = reverse("add_product")
        responseNoForm = self.client.post(url, {})
        self.assertEqual(responseNoForm.status_code, 401)

class findProduct(TestCase):
    def setup(self):
        self.client = Client()

    def test_find_product(self):
        url = reverse("add_product")

        #Grab JSON response which includes token
        tokenData = add_account(0, "MaxLam", "passM", "Maxwell", "Lam", "123 Street", "102.10", "Cash")
        data = json.loads(tokenData.content)
        chosenToken = data['token']

        product1 = {
            'token': chosenToken,
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

        product2 = {
            'token': chosenToken,
            'category': 'Food',
            'name': 'Cheese',
            'price': 2.99,
            'seller': 2,
            'image_id': "ImageHere",
            'num_sales': 100,
            'inventory': 500,
            'approval_status': 0,
            'description': 'Swiss',
        }

        product3 = {
            'token': chosenToken,
            'category': 'Food',
            'name': 'Ham',
            'price': 3.99,
            'seller': 3,
            'image_id': "ImageHere",
            'num_sales': 102,
            'inventory': 502,
            'approval_status': 1,
            'description': 'Honey Ham',
        }

        response = self.client.post(url, product1)
        self.assertEqual(response.status_code, 200)

        response = self.client.post(url, product2)
        self.assertEqual(response.status_code, 200)

        response = self.client.post(url, product3)
        self.assertEqual(response.status_code, 200)

        newUrl = reverse('get_product_info')
        response = self.client.get(newUrl, {'id':2})
        data = json.loads(response.content)
        productName = data['name']

        self.assertEqual(productName, 'Cheese')
        self.assertEqual(response.status_code, 200)

        responseWrong = self.client.get(newUrl, {'id':999})
        self.assertEqual(responseWrong.status_code, 401)

class place_orderTestCases(TestCase):

    def setUp(self):
        self.client = Client()

    def test_place_order_correct_token(self):
        url = reverse("place_order")

        #Grab JSON response which includes token
        tokenData = add_account(0, "MaxLam", "passM", "Maxwell", "Lam", "123 Street", "102.10", "Cash")
        data = json.loads(tokenData.content)
        chosenToken = data['token']

        place_order_response = self.client.post(url, {'token':chosenToken})
        self.assertEqual(place_order_response.status_code, 200)

    def test_place_order_no_token(self):
        url = reverse("place_order")

        place_order_response = self.client.post(url, {'token': ""})
        self.assertEqual(place_order_response.status_code, 401)

    def test_place_order_incorrect_token(self):
        url = reverse("place_order")

        place_order_response = self.client.post(url, {'token': "WRONG"})
        self.assertEqual(place_order_response.status_code, 401)



