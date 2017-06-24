# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models

class Notes(models.Model):
    encrypted_note = models.TextField(blank=True)
    token = models.CharField(max_length=6)
    timestamp = models.DateTimeField('Created on')
