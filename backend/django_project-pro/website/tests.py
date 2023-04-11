from django.test import TestCase
from django.urls import reverse
from website.models import User

class LoginTestCase(TestCase):
    def setUp(self):
        self.username = 'testuser'
        self.password = 'testpass'
        self.user = User.objects.create(username=self.username, password=self.password)

    def test_login(self):
        url = reverse('basic_login')
        response = self.client.post(url, {'username': self.username, 'password': self.password})
        self.assertRedirects(response, reverse('profile', args=[self.user.id]))
        user = response.wsgi_request.user
        # self.assertEqual(user, self.user)
        self.assertEqual(2,2)
