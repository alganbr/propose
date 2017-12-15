from rest_framework import status
from propose.test import ProposeTestCase

from .factories import *
from .models import *

class TagTests(ProposeTestCase):
    def test_list_tags(self):
        self.auth_check_get('/api/tags/')

        tag1 = TagFactory()
        tag2 = TagFactory()
        tags = {}
        tags[tag1.pk] = tag1
        tags[tag2.pk] = tag2
        response = self.client.get('/api/tags/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['name'], tags[response.data[0]['id']].name)
        self.assertEqual(response.data[1]['name'], tags[response.data[1]['id']].name)

    def test_create_tag(self):
        self.auth_check_post('/api/tags/')

        data = { 'name': 'python3' }
        response = self.client.post('/api/tags/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Tag.objects.count(), 1)
        self.assertEqual(Tag.objects.first().name, 'python3')

        response = self.client.post('/api/tags/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
