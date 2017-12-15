from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics

from .models import *
from .serializers import *
from django.db.models import Q

def authorized_to_access_project(project, request):
    # Must be either client or freelancer
    if (project.client_id == request.user.pk or
        project.freelancer_dashboard.owner_id == request.user.pk):
        return True
    return False

def client_only(project, request):
    return project.client_id != request.user.pk

# Create your views here.
class ProjectList(APIView):
    """
    /api/projects
    """
    def get(self, request, format=None):
        projects = Project.objects.filter(is_taken=False)
        alltags = self.request.query_params.get('tags', None)
        if alltags is not None:
            tag_list = alltags.split(u',')
            for tag in tag_list:
                tag = tag.strip()
                if tag is not "":
                    projects = projects.filter(tags__name=tag)
        allterms = self.request.query_params.get('search_terms', None)
        if allterms is not None:
            term_list = allterms.split(u' ')
            for term in term_list:
                term = term.strip()
                if term is not "":
                    projects = projects.filter(Q(title__icontains=term) | Q(description__icontains=term))
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        project_data = request.data
        client_account = get_object_or_404(Account, user=request.user.pk)
        project_data['client'] = client_account.pk
        serializer = ProjectCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectDetail(APIView):
    """
    /api/projects/<id>
    """
    def get_object(self, pk):
        return get_object_or_404(Project, pk=pk)

    def get(self, request, pk, format=None):
        project = self.get_object(pk)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        project = self.get_object(pk)
        if client_only(project, request):
            return Response(None, status=status.HTTP_403_FORBIDDEN)
        serializer = ProjectUpdateSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk, format=None):
        project = self.get_object(pk)
        if client_only(project, request):
            return Response(None, status=status.HTTP_403_FORBIDDEN)
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ProjectTask(APIView):
    """
    /api/projects/<id>/tasks
    """

    def get_object(self, pk):
        return get_object_or_404(Project, pk=pk)

    def get(self, request, pk, format=None):
        project = self.get_object(pk)
        if not authorized_to_access_project(project, request):
            return Response(None, status=status.HTTP_403_FORBIDDEN)

        task = Task.objects.filter(project=project)
        serializer = TaskSerializer(task, many=True)
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        project = self.get_object(pk)
        if not authorized_to_access_project(project, request):
            return Response(None, status=status.HTTP_403_FORBIDDEN)

        task_number = Task.objects.filter(project=project.pk).count()+1
        task_data = request.data
        task_data['project'] = project.pk
        task_data['task_number'] = task_number
        serializer = TaskCreateSerializer(data=task_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectTaskDetail(APIView):
    """
    /api/projects/<id>/tasks/<task_number>
    """

    def get_object(self, pk):
        return get_object_or_404(Project, pk=pk)

    def get(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        task_number = self.kwargs.get('task_number')
        project = self.get_object(pk)
        if not authorized_to_access_project(project, request):
            return Response(None, status=status.HTTP_403_FORBIDDEN)

        task = get_object_or_404(Task, project=project, task_number=task_number)
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        task_number = self.kwargs.get('task_number')
        project = self.get_object(pk)
        if not authorized_to_access_project(project, request):
            return Response(None, status=status.HTTP_403_FORBIDDEN)

        task = get_object_or_404(Task, project=project, task_number=task_number)
        task_data = request.data
        serializer = TaskUpdateSerializer(task, data=task_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectCommentDetail(APIView):
    """
    /api/projects/<id>/comments
    """

    def get_object(self, pk):
        return get_object_or_404(Project, pk=pk)

    def get(self, request, pk, format=None):
        project = self.get_object(pk)
        if not authorized_to_access_project(project, request):
            return Response(None, status=status.HTTP_403_FORBIDDEN)

        comments = ProjectComment.objects.filter(project=project)
        serializer = ProjectCommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        project = self.get_object(pk)
        if not authorized_to_access_project(project, request):
            return Response(None, status=status.HTTP_403_FORBIDDEN)

        comment = request.data
        comment['project'] = pk
        serializer = ProjectCommentCreateSerializer(data=comment)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
