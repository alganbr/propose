from rest_framework import status
from propose.test import ProposeTestCase

from .factories import *
from tag.factories import TagFactory
from .models import *

class ProjectTests(ProposeTestCase):
    def test_list_projects(self):
        self.auth_check_get('/api/projects/')

        project = ProjectFactory()
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], project.pk)

    def test_retrieve_project(self):
        self.auth_check_get('/api/projects/0/')

        response = self.client.get('/api/projects/99999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        project = ProjectFactory()
        response = self.client.get('/api/projects/%d/' % project.pk)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], project.pk)

    def test_create_project(self):
        self.auth_check_post('/api/projects/')

        data = {
            'client': -1,
            'title': 'test project',
            'description': 'This is a test project.',
            'compensation': { 'currency': 'USD', 'value': 130 },
        }
        response = self.client.post('/api/projects/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Project.objects.count(), 1)
        project = Project.objects.get()
        self.assertEqual(project.client.pk, self.account.pk)
        self.assertEqual(project.title, 'test project')

    def test_update_project(self):
        self.auth_check_post('/api/projects/0/')

        response = self.client.post('/api/projects/99999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        compensation = { 'currency': 'USD', 'value': 130 }
        tags = [TagFactory().pk, TagFactory().pk]
        data = {
            'compensation': compensation,
            'tags': tags,
            'title': 'test project update',
            'description': 'This is a test project update.'
        }
        other_project = ProjectFactory(title='test project pre-update')
        response = self.client.post('/api/projects/%d/' % other_project.pk, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Project.objects.get(id=other_project.pk).title, 'test project pre-update')

        project = ProjectFactory(client=self.account)
        response = self.client.post('/api/projects/%d/' % project.pk, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        updated = Project.objects.get(id=project.pk)
        self.assertEqual(updated.title, 'test project update')
        self.assertEqual(updated.description, 'This is a test project update.')

    def test_destroy_project(self):
        self.auth_check_delete('/api/projects/0/')

        response = self.client.delete('/api/projects/99999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        project = ProjectFactory(client=self.account)
        other_project = ProjectFactory()
        response = self.client.delete('/api/projects/%d/' % other_project.pk)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Project.objects.count(), 2)

        response = self.client.delete('/api/projects/%d/' % project.pk)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Project.objects.count(), 1)

    def test_list_project_comments(self):
        self.auth_check_get('/api/projects/0/comments')

        response = self.client.get('/api/projects/99999/comments')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        other_comment = ProjectCommentFactory()
        response = self.client.get('/api/projects/%d/comments' % other_comment.project.pk)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        comment = ProjectCommentFactory(project__client=self.account)
        response = self.client.get('/api/projects/%d/comments' % comment.project.pk)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], comment.pk)

    def test_create_project_comment(self):
        self.auth_check_post('/api/projects/0/comments')

        response = self.client.post('/api/projects/99999/comments')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        data = {
            'project': -1,
            'user': self.account.pk,
            'comment': 'This is a comment.',
        }
        other_project = TakenProjectFactory()
        response = self.client.post('/api/projects/%d/comments' % other_project.pk, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        project = TakenProjectFactory(client=self.account)
        response = self.client.post('/api/projects/%d/comments' % project.pk, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ProjectComment.objects.count(), 1)
        self.assertEqual(ProjectComment.first().comment, 'This is a comment.')
