from rest_framework import status
from rest_framework.test import APITestCase

from account.factories import AccountFactory

class ProposeTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.account = AccountFactory()

    def auth_check_get(self, url):
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.client.force_authenticate(user=self.account.user)

    def auth_check_post(self, url):
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.client.force_authenticate(user=self.account.user)

    def auth_check_delete(self, url):
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.client.force_authenticate(user=self.account.user)
