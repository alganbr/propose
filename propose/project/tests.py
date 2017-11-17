from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from .models import *

class ProjectTests(APITestCase):
    # TODO consider factory boy?
    @classmethod
    def setUpTestData(cls):
        client_user = User.objects.create_user('client')
        client = Account.objects.create(user = client_user)
        freelancer_user = User.objects.create_user('freelancer')
        freelancer = Account.objects.create(user = freelancer_user)
        dashboard = Dashboard.objects.create(owner = freelancer)

        Project.objects.create(client = client, dashboard = dashboard, title = 'Test Project', description = 'description')

    def test_list_projects(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_retrieve_project(self):
        response = self.client.get('/api/projects/99999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        response = self.client.get('/api/projects/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], 1)

    def test_create_project(self):
        data = {}
        response = self.client.post('/api/projects/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Project.objects.count(), 2)

    def test_update_project(self):
        data = { 'title': 'Changed Test' }
        response = self.client.post('/api/projects/1/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        response = self.client.post('/api/projects/1/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Project.objects.get(id=1).title, 'Changed Test')

    def test_destroy_project(self):
        response = self.client.delete('/api/projects/99999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        response = self.client.delete('/api/projects/1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Project.objects.count(), 0)
