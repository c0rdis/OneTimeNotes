from django.conf.urls import url
from views import otnote, otnote_create, otn_stats

urlpatterns = [
    url(r'^otn$', otnote_create, name='otnote_create'),
    url(r'^otnote$', otnote_create, name='otnote_create'),
    url(r'^otn_stats$', otn_stats, name='otn_stats'),
    url(r'^n/(?P<note_id>[\da-zA-Z]{6})', otnote, name='otnote'),
]
