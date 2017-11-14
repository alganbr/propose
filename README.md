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
  * run npm install 
  * cd ~/propose
  * python manage.py runserver 0.0.0.0:8000
  * for front-end to see changes: run node_modules/.bin/webpack --config webpack.local.config.js
