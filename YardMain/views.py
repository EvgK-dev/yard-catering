from django.shortcuts import render, redirect
from django.http import HttpResponseBadRequest
from django.urls import reverse
from .models import FAQ, Service, Products, Review, Prepayment, AccountNumber, Photo
from telegram import Bot
from asgiref.sync import async_to_sync, sync_to_async
from decouple import config
import aiohttp
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views import View


# Вспомогательная функция для формирования контекста
def get_common_context():
    prepayment = Prepayment.objects.first()
    bankNumber = AccountNumber.objects.first()

    return {
        'prepayment': prepayment,
        'bankNumber': bankNumber,
        'services_id': '#services_id',
        'food_id': '#food_id',
        'contact_id': '#contact_id',
        'comment_id': '#comment_id',
    }


def index(request):
    faqs = FAQ.objects.all()
    services = Service.objects.all()
    products = Products.objects.all()
    reviews = Review.objects.all()

    context = get_common_context()
    context.update({
        'title': 'YARD - кейтеринг, доставка еда, организация мероприятий',
        'faqs': faqs,
        'services': services,
        'products': products,
        'reviews': reviews,
    })

    return render(request, 'YardMain/index.html', context)


def mail_done(request):
    name = request.GET.get('name', '')
    phone = request.GET.get('phone', '')

    context = get_common_context()
    context.update({
        'title': 'YARD - обратная связь',
        'form_data': {'name': name, 'phone': phone},
    })

    return render(request, 'YardMain/mail_done.html', context)


def photo(request):
    name = request.GET.get('name', '')
    phone = request.GET.get('phone', '')
    photos = Photo.objects.all()

    context = get_common_context()
    context.update({
        'title': 'YARD - обратная связь',
        'form_data': {'name': name, 'phone': phone},
        'photos': photos,
    })

    return render(request, 'YardMain/photo.html', context)


@sync_to_async
def set_session_data(session, key, value):
    session[key] = value
    session.save()


async def send_telegram_message(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        comment = request.POST.get('comment')

        telegram_bot_token = config('TELEGRAM_BOT_TOKEN')
        telegram_group_chat_id = config('TELEGRAM_GROUP_CHAT_ID')

        bot = Bot(token=telegram_bot_token)
        telegram_message = f"ПИСЬМО!\n\nИмя: {name}\nТелефон: {phone}\nКомментарий: {comment}"
        await bot.send_message(chat_id=telegram_group_chat_id, text=telegram_message)

        context = {'name': name, 'phone': phone}
        url = reverse('mail_done') + '?' + '&'.join([f'{key}={value}' for key, value in context.items()])
        return redirect(url)
    return HttpResponseBadRequest("Invalid request method.")


class SubmitYardView(View):
    @async_to_sync
    async def post(self, request):
        form_data = dict(request.POST.items())

        order_list = form_data.get('order_list', '')
        date = form_data.get('date', '')
        time = form_data.get('time', '')
        prepayment = form_data.get('prepayment', '')
        userName = form_data.get('userName', '')
        phoneNumber = form_data.get('phoneNumber', '')
        comment = form_data.get('comment', '')

        date_obj = datetime.strptime(date, "%Y-%m-%d")
        formatted_date = date_obj.strftime("%d.%m.%Y")

        telegram_bot_token = config('TELEGRAM_BOT_TOKEN')
        telegram_group_chat_id = config('TELEGRAM_GROUP_CHAT_ID')

        telegram_message = f"<b>ЗАКАЗ!</b>\n\n<b>ИМЯ:</b> {userName}\n<b>ТЕЛ:</b> <code>{phoneNumber}</code>\n\n<b>ДАТА:</b> {formatted_date}\n<b>ВРЕМЯ:</b> {time}\n\nзаказ: {order_list}\n<b>предоплата:</b> {prepayment}\n\n<b>КОММЕНТАРИЙ:</b> {comment}"

        bot = Bot(token=telegram_bot_token)
        await bot.send_message(chat_id=telegram_group_chat_id, text=telegram_message, parse_mode="HTML")

        file_attachment = request.FILES.get('fileAttachment')
        if file_attachment:
            async with aiohttp.ClientSession() as session:
                url = f'https://api.telegram.org/bot{telegram_bot_token}/sendPhoto?chat_id={telegram_group_chat_id}'
                data = aiohttp.FormData()
                data.add_field('photo', file_attachment.file, filename=file_attachment.name)

                async with session.post(url, data=data) as resp:
                    if resp.status == 200:
                        context = {'name': userName, 'phone': phoneNumber}
                        url = reverse('mail_done') + '?' + '&'.join([f'{key}={value}' for key, value in context.items()])
                        return redirect(url)
                    else:
                        return HttpResponseBadRequest("Ошибка при отправке файла в Telegram.")

        context = {'name': userName, 'phone': phoneNumber}
        url = reverse('mail_done') + '?' + '&'.join([f'{key}={value}' for key, value in context.items()])
        return redirect(url)
