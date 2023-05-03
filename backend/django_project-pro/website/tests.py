from django.test import TestCase, Client
from django.urls import reverse
from website.views import add_account, add_product, add_user_activity
import json


class SignInTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        add_account(0, "MaxLam", "passM", "Maxwell",
                    "Lam", "123 Street", "102.10", "Cash")

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
        # Grab JSON response which includes token
        tokenData = add_account(
            0, "MaxLam", "passM", "Maxwell", "Lam", "123 Street", "102.10", "Cash")
        data = json.loads(tokenData.content)
        chosenToken = data['token']

        url = reverse("add_product")
        form_data = {
            'token': chosenToken,  # Uses token
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

        # Grab JSON response which includes token
        tokenData = add_account(
            0, "MaxLam", "passM", "Maxwell", "Lam", "123 Street", "102.10", "Cash")
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
        response = self.client.get(newUrl, {'id': 2})
        data = json.loads(response.content)
        productName = data['name']

        self.assertEqual(productName, 'Cheese')
        self.assertEqual(response.status_code, 200)

        responseWrong = self.client.get(newUrl, {'id': 999})
        self.assertEqual(responseWrong.status_code, 404)

class place_orderTestCases(TestCase):

    def setUp(self):
        self.client = Client()

    def test_place_order_correct_token(self):
        url = reverse("place_order")

        # Grab JSON response which includes token
        tokenData = add_account(
            0, "MaxLam", "passM", "Maxwell", "Lam", "123 Street", "102.10", "Cash")
        data = json.loads(tokenData.content)
        chosenToken = data['token']

        place_order_response = self.client.post(url, {'token': chosenToken})
        self.assertEqual(place_order_response.status_code, 200)

    def test_place_order_no_token(self):
        url = reverse("place_order")

        place_order_response = self.client.post(url, {'token': ""})
        self.assertEqual(place_order_response.status_code, 401)

    def test_place_order_incorrect_token(self):
        url = reverse("place_order")

        place_order_response = self.client.post(url, {'token': "WRONG"})
        self.assertEqual(place_order_response.status_code, 401)

class return_orderTestCases(TestCase):
    def setUp(self):
        self.client = Client()

    def test_return_order(self):
        tokenData = add_account(
            0, "MaxLam", "passM", "Maxwell", "Lam", "123 Street", "102.10", "Cash")
        data = json.loads(tokenData.content)
        chosenToken = data['token']

        url = reverse("place_order")
        place_order_response = self.client.post(url, {'token': chosenToken})
        self.assertEqual(place_order_response.status_code, 200)

        returnUrl = reverse('return_order')
        return_orderResponse = self.client.post(
            returnUrl, {'token': chosenToken, 'order_id': 1})
        self.assertEqual(return_orderResponse.status_code, 200)

    def test_return_no_token(self):
        url = reverse("return_order")
        place_order_response = self.client.post(url)
        self.assertEqual(place_order_response.status_code, 401)

    def test_return_no_formInput(self):
        tokenData = add_account(
            0, "MaxLam", "passM", "Maxwell", "Lam", "123 Street", "102.10", "Cash")
        data = json.loads(tokenData.content)
        chosenToken = data['token']

        url = reverse("return_order")
        place_order_response = self.client.post(url, {'token': chosenToken})
        self.assertEqual(place_order_response.status_code, 400)

class SellerTest(TestCase):

    def __init__(self, *args, **kwargs):
        super(SellerTest, self).__init__(*args, **kwargs)
        self.chosenToken = ""

    def setup(self):
        self.client = Client()

        # Create a seller
        tokenData = add_account(
            0, "benmoore", "12345678", "Ben", "Moore", "123 Street", "0", "1234 1234 1234 1234")
        data = json.loads(tokenData.content)

        self.chosenToken = data['token']

        url = reverse("add_product")
        form_data = {
            'token': self.chosenToken,  # Uses token
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

    def test_edit_product(self):
        """Tests whether a seller can edit a product and whether the changes are reflected in the database
        """
        self.setup()

        url = reverse("edit_seller_product")

        form_data = {
            'token': self.chosenToken,  # Uses token
            'product_id': 1,
            'price': 19.99,
            'description': 'A classic novel by F. Scott Fitzgerald, priced by inflation.',
        }

        response = self.client.post(url, form_data)
        self.assertEqual(response.status_code, 200)

        # Load the product info
        url = reverse("get_product_info")
        response = self.client.get(url, {'id': 1})
        data = json.loads(response.content)

        # See if the price was updated
        self.assertEqual(data['price'], "19.99")

    def test_negative_inventory(self):
        """Tests whether a seller can add a product with negative inventory
        """
        self.setup()

        url = reverse("edit_seller_product")

        form_data = {
            'token': self.chosenToken,  # Uses token
            'product_id': 1,
            'inventory': -1,
        }

        response = self.client.post(url, form_data)
        self.assertEqual(response.status_code, 400)

    def test_edit_product_no_token(self):
        """Tests whether a seller can edit a product without a token
        """
        self.setup()

        url = reverse("edit_seller_product")

        form_data = {
            'product_id': 1,
            'price': 19.99,
            'description': 'A classic novel by F. Scott Fitzgerald, priced by inflation.',
        }

        response = self.client.post(url, form_data)
        self.assertEqual(response.status_code, 401)

    def test_edit_product_no_product_id(self):
        """Tests whether a seller can edit a product without a product_id
        """
        self.setup()

        url = reverse("edit_seller_product")

        form_data = {
            'token': self.chosenToken,  # Uses token
            'price': 19.99,
            'description': 'A classic novel by F. Scott Fitzgerald, priced by inflation.',
        }

        response = self.client.post(url, form_data)
        self.assertEqual(response.status_code, 404)

    def test_delete_product(self):
        """_summary_: Tests whether a seller can remove a product and whether the changes are reflected in the database
        """
        self.setup()

        url = reverse("delete_seller_product")

        form_data = {
            'token': self.chosenToken,  # Uses token
            'product_id': 1,
        }

        response = self.client.post(url, form_data)
        self.assertEqual(response.status_code, 200)

        # Load the product info
        url = reverse("get_product_info")
        response = self.client.get(url, {'id': 1, 'token': self.chosenToken})
        self.assertEqual(response.status_code, 404)

class logActivities_TestCases(TestCase):
    def setUp(self):
        self.client = Client()

    def test_add_activity(self):
        tokenData = add_user_activity(1, "Testing Log Activites 1")
        data = json.loads(tokenData.content)
        chosenToken = data['message']

        self.assertEqual(chosenToken, "Logged Action added successfully!")

    def test_return_activites(self):
        tokenData = add_user_activity(1, "Testing Log Activites 1")

        tokenData = add_account(
            0, "MaxLam", "passM", "Maxwell", "Lam", "123 Street", "102.10", "Cash")
        data = json.loads(tokenData.content)
        chosenToken = data['token']

        url = reverse("return_activities")

        returnActivites = self.client.post(url, {'token': chosenToken})
        data = json.loads(returnActivites.content)

        data1 = data[0]
        matchDescription = data1["action_description"]

        self.assertEqual(matchDescription, "Testing Log Activites 1")