# CS130 Project

### Propose

This project is a web app where people can post projects for freelance workers to take on.

### Team NL

Members:
  * Michael Wang
  * Jason Jiang
  * James Kang
  * Nathan Chou
  * Algan Rustinya
  * Frederick Kennedy

### Environment Setup (How to Run the Code)

1. Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads) and [Vagrant](https://www.vagrantup.com/downloads.html).
2. In a terminal, run these commands (on the first run, this may take some time as Vagrant downloads and installs all our dependencies):
```
cd vm
vagrant up
vagrant ssh
cd ~/propose
python manage.py runserver 0.0.0.0:8000
```
3. In another terminal:
```
cd vm
vagrant ssh
node server.js
```
4. The website should be accessible in the host machine (i.e. *not* in the terminal) at 127.0.0.1:8000.

Note Vagrant may have some additional OS-specific steps (particularly for Windows). Please reach out to us if you experience difficulties setting up the environment.

### Testing

Tests are in each Django's folder's tests.py. Use `python manage.py test` to run all tests.

For example, see the tests for the project-related API calls at [/propose/propose/project/tests.py](https://github.com/micwa/propose/blob/master/propose/project/tests.py).
* `test_list_projects` tests the API `GET /api/projects`.

  It succeeds if and only if the call returns a list with length 1, containing a test project created before the API call.

* `test_retrieve_project` tests the API `GET /api/projects/{id}`, using the id of a pre-created test project.

  It succeeds if the call returns that project. It fails if not, or if an invalid id is not recognized.

* `test_create_project` tests the API `POST /api/projects`.

  It succeeds if the database contains 1 project after the operation: the newly created one.

* `test_update_project` tests the API `POST /api/project/{id}`, using the id of a pre-created test project.

  It succeeds if that project is updated accordingly. It fails if not, or if an invalid id is not recognized.

* `test_destroy_project` tests the API `DELETE /api/project/{id}`, using the id of a pre-created test project.

  It succeeds if the database contains no projects after the operation. It fails otherwise, or if an invalid id is not recognized.
