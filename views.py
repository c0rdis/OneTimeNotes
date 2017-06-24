 -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
rom django.http import HttpResponse, HttpResponseBadRequest, Http404
from django import forms
from OTN.models import Notes
from string import ascii_letters, digits
from datetime import datetime
import random

# === VIEWS START HERE ===

# Definition of ignored User-Agents
ignoredUAs = [
 'WhatsApp',
 'TelegramBot',
 'Slackbot-LinkExpanding',
 'facebookexternalhit'
]


# OTN input handler
class OTNForm(forms.Form):
    private_note = forms.CharField(label='',widget=forms.Textarea(attrs={'cols': 50, 'rows': 15, 'placeholder': 'Input your note here'}))


# URL token generator
def generate_token(length):
    allowed_chars = ascii_letters + digits
    token = ''.join(random.sample(allowed_chars,length))
    return token


# handler for /n/<note_id> 
# <note-id> - 6 symbols [a-zA-Z0-9]
def otnote(request, note_id):
    if any(iua in request.META['HTTP_USER_AGENT'] for iua in ignoredUAs):
        raise Http404
    try:
        note = Notes.objects.get(token=note_id)
    except Notes.DoesNotExist:
        raise Http404
    otn = note.encrypted_note
    # delete the note from the DB
    note.delete()
    return render(request, 'decrypted_note.html', {'encrypted_note':otn})


# handler for /otnote
def otnote_create(request):
    if request.is_ajax():
        if request.method == 'GET':
            raise Http404
        elif request.method == 'POST':
            token = generate_token(6)
            already_exists = True
            while already_exists:
                try:
                    existing = Notes.objects.get(token=token)
                    token = generate_token(6)
                except Notes.DoesNotExist:
                    already_exists = False
            otn = request.POST['private_note']
            # discard messages bigger than 20Kb 
            if len(otn) > 20 * 1024:
                return HttpResponseBadRequest('Sorry, that\'s too much!')
            write_note = Notes.objects.create(encrypted_note=otn,token=token,timestamp=datetime.now())
            return HttpResponse(token)
    else:        
        form = OTNForm()
        return render(request,'otnote.html', {'form':form})
