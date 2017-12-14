from django.core import serializers
from rest_framework import status
from rest_framework.test import APITestCase
from . import factories

class AccountTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.account = factories.AccountFactory()

    def get_with_auth(self, url):
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.client.force_authenticate(user=self.account.user)
        response = self.client.get(url)
        return response

    def post_with_auth(self, url, data):
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.client.force_authenticate(user=self.account.user)
        response = self.client.post(url, data, format='json')
        return response
    
    def test_list_users(self):
        account2 = factories.AccountFactory()
        response = self.get_with_auth('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_create_user(self):
        data = { 'username': 'usertest', 'email': 'usertest@gmail.com', 'password': 'password' }
        response = self.post_with_auth('/api/users/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Account.objects.count(), 2)

    def test_retrieve_user(self):
        account2 = factories.AccountFactory()
        response = self.get_with_auth('/api/users/' + str(account2.user.id) + '/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], account2.user.id)

    def test_retrieve_user_review(self):
    def test_create_user_review(self):
    def test_retrieve_profile(self):
    def test_create_profile(self):
