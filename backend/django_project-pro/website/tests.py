from django.test import TestCase, Client
from django.urls import reverse
from website.models import User

class SignInTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_signin(self):
        url = '/user/signin/'  # replace with your actual URL path
        data = {
            'username': 'MaxLam',
            'password': 'passM'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 200)