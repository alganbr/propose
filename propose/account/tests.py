from rest_framework import status
from propose.test import ProposeTestCase

from .factories import *
from tag.factories import TagFactory
from .models import *

class AccountTests(ProposeTestCase):
    def test_list_users(self):
        self.auth_check_get('/api/users/')

        account2 = AccountFactory()
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_create_user(self):
        self.auth_check_post('/api/users/')

        data = { 'user': { 'username': 'usertest', 'email': 'usertest@gmail.com', 'password': 'password' } }
        response = self.client.post('/api/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Account.objects.count(), 2)

        skills = [TagFactory().pk, TagFactory().pk]
        data = { 'user': { 'username': 'testskills', 'email': 'testskills@gmail.com', 'password': 'password' }, 'skills': skills }
        response = self.client.post('/api/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        account = Account.objects.get(user__username='testskills')
        self.assertEqual(account.skills.count(), 2)

    def test_retrieve_user(self):
        self.auth_check_get('/api/users/0/')

        response = self.client.get('/api/users/99999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        account2 = AccountFactory()
        response = self.client.get('/api/users/%d/' % account2.pk)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], account2.pk)

    def test_retrieve_user_review(self):
        self.auth_check_get('/api/users/0/review')

        response = self.client.get('/api/users/99999/review')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        account2 = AccountFactory()
        review = UserReviewFactory(reviewee=account2, reviewer=self.account)
        response = self.client.get('/api/users/%d/review' % review.reviewee.pk)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['reviewee']['id'], review.reviewee.pk)
        self.assertEqual(response.data[0]['reviewer']['id'], review.reviewer.pk)

    def test_create_user_review(self):
        self.auth_check_post('/api/users/0/review')

        response = self.client.post('/api/users/99999/review')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        account2 = AccountFactory()
        # reviewer should be ignored
        data = { 'reviewer': -1, 'review': 'test review', 'rating': 5 }
        response = self.client.post('/api/users/%d/review' % account2.pk, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        first = UserReview.objects.first()
        self.assertEqual(first.reviewee.pk, account2.pk)
        self.assertEqual(first.reviewer.pk, self.account.pk)

    def test_retrieve_profile(self):
        self.auth_check_get('/api/profile/')

        response = self.client.get('/api/profile/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.account.pk)

    def test_update_profile(self):
        self.auth_check_post('/api/profile/')

        # id should be ignored
        user = { 'username': 'ignored', 'password': 'password', 'email': 'testing@gmail.com', 'first_name': 'John', 'last_name': 'Chen' }
        skills = [TagFactory().pk, TagFactory().pk]
        data = { 'id': -1, 'user': user, 'bio': 'hello, world', 'skills': skills, 'rating': 1 }
        response = self.client.post('/api/profile/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        account = Account.objects.get(pk=self.account.pk)
        self.assertEqual(account.bio, 'hello, world')
        self.assertEqual(account.rating, 1)
        self.assertEqual(account.skills.count(), 2)
        self.assertNotEqual(account.pk, -1)
        self.assertNotEqual(account.user.username, 'ignored')
        self.assertEqual(account.user.first_name, 'John')
        self.assertEqual(account.user.last_name, 'Chen')
