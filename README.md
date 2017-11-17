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

### Vagrant Environment Setup

If you don't have virtual box download it first:
https://www.virtualbox.org/

Instruction to run the project:
  * cd vm
  * vagrant up
  * vagrant ssh
  * cd ~/propose
  * python manage.py runserver 0.0.0.0:8000
  * for front-end to see changes: run node_modules/.bin/webpack --config webpack.local.config.js

### Testing

Tests are in each Django's folder's tests.py. Use `python manage.py test` to run all tests.

For example, see the tests for the project-related API calls at [/propose/propose/project/tests.py](https://github.com/micwa/propose/blob/master/propose/project/tests.py). Before each test, we assume there is already one project in the database.
* `test_list_projects` tests the API `GET /api/projects`.

  It succeeds if and only if the call returns a list with length 1, containing the project already in the database.

* `test_retrieve_project` tests the API `GET /api/projects/{id}`, using the id of the project in the database.

  It succeeds if the call returns that project. It fails if not, or if an invalid id is not recognized.

* `test_create_project` tests the API `POST /api/projects`.

  It succeeds if the database contains two projects after the operation, one having just been created.

* `test_update_project` tests the API `POST /api/project/{id}`, using the id of the project in the database.

  It succeeds if that project is updated accordingly. It fails if not, or if an invalid id is not recognized.

* `test_destroy_project` tests the API `DELETE /api/project/{id}`, using the id of the project in the database.

  It succeeds if the database contains no projects after the operation. It fails otherwise, or if an invalid id is not recognized.
