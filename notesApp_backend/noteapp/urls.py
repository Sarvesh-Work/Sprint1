from django.urls import path
from . import views

urlpatterns = [
    path('notes/search/', views.search_note_by_title, name="search"),  
    path('notes/', views.notes, name='notes'),
    path('notes/<slug:slug>/', views.note_detail, name='note_detail'),
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('logout/', views.logout, name='logout'),
    path('profile/', views.current_user, name='current_user'),
    path('notes/delete/<slug:slug>/', views.delete_note_by_slug, name='delete-note-by-slug'),
    path('notes/update/<slug:slug>/', views.update_note_by_slug, name='update-note'),
]