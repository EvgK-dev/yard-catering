from django.urls import path
 
from .views import *
 
urlpatterns = [
    path('', index, name='main'), 
    path('mail_done/', mail_done, name='mail_done'),
    path('photo/', photo, name='photo'),
    path('send-telegram-message/', send_telegram_message, name='send_telegram_message'), 
    path('submit_yard/', SubmitYardView.as_view(), name='submit_yard'),
]