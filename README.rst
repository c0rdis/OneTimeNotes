=====
OneTimeNotes
=====

OneTimeNotes is a simple Django realization of anonymous one-time self-destructing 
notes, which are encrypted in the browser using TripleSec (Salsa20 + AES + Twofish) 
algorithm with randomly generated key.

Detailed documentation is in the "docs" directory.

Quick start
-----------

1. Add "OneTimeNotes" to your INSTALLED_APPS setting like this:

    INSTALLED_APPS = [
        ...
        'OneTimeNotes',
    ]

2. Add "templates" folder to your DIRS:

	TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['./OneTimeNotes/templates/'],
        ...
    ]

3. Add "static" folder to STATICFILES_DIRS:

	STATICFILES_DIRS = (os.path.join(BASE_DIR+'OneTimeNotes/', 'static'),)

4. Include the OneTimeNotes URLconf in your project urls.py like this:

    url(r'^', include('OneTimeNotes.urls')),

5. Run `python manage.py migrate` to create the OneTimeNotes models.

6. Start the development server and visit http://127.0.0.1:8000/otn
   to create a one-time note.

5. Visit the generated link to access a newly created note, and check
the total number of stored notes at http://127.0.0.1:8000/otn_stats.
