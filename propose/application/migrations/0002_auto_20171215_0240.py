# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-12-15 10:40
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workoffer',
            name='expire_time',
            field=models.DateTimeField(default=datetime.datetime(2018, 1, 14, 2, 40, 23, 807541)),
        ),
    ]
