from django.db import models

from django.core.validators import MaxValueValidator

class FAQ(models.Model):
    question = models.CharField(max_length=255, verbose_name='Вопрос')
    answer = models.TextField(verbose_name='Ответ')

    def __str__(self):
        return self.question
    
    class Meta:
        verbose_name = 'FAQ'  
        verbose_name_plural = 'FAQ'  
    

class Service(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название услуги')
    description = models.TextField(max_length=120, verbose_name='Описание услуги')
    price_rub = models.IntegerField(verbose_name='Цена рублей')
    price_kop = models.IntegerField(choices=[(i, i) for i in range(100)], verbose_name='Цена копеек')

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'УСЛУГИ'  
        verbose_name_plural = 'УСЛУГИ'  


class ServiceImage(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='service_images/')

    def __str__(self):
        return f"Image for {self.service.name}"
    
    class Meta:
        verbose_name = 'фото услуг'  
        verbose_name_plural = 'фото услуг'  
    

class Products(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название продукта')
    description = models.TextField(verbose_name='Описание продукта')
    price_rub = models.IntegerField(verbose_name='Цена рублей')
    price_kop = models.IntegerField(choices=[(i, i) for i in range(100)], verbose_name='Цена копеек')

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'ПРОДУКТЫ'  
        verbose_name_plural = 'ПРОДУКТЫ'  

class ProductsImage(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return f"Image for {self.product.name}"
    
    class Meta:
        verbose_name = 'фото продуктов'  
        verbose_name_plural = 'фото продуктов'  
    


class Review(models.Model):
    name = models.CharField(max_length=100, verbose_name='Имя')
    image = models.ImageField(upload_to='review_images/', verbose_name='Аватар')
    text = models.TextField(verbose_name='Текст отзыва')

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'отзывы'  
        verbose_name_plural = 'отзывы'  


class Prepayment(models.Model):
    prepayment_amount = models.PositiveSmallIntegerField(
        verbose_name='Размер предоплаты',
        default=0,
        validators=[MaxValueValidator(100)]
    )

    def __str__(self):
        return f"Размер предоплаты: {self.prepayment_amount}%"
    
    class Meta:
        verbose_name = 'Размер предоплаты'  
        verbose_name_plural = 'Размер предоплаты'  


class AccountNumber(models.Model):
    account_number = models.BigIntegerField(verbose_name='Номер счета', unique=True)

    def __str__(self):
        return str(self.account_number)

    class Meta:
        verbose_name = 'Номер банк.счета'
        verbose_name_plural = 'Номер банк.счета'


class Photo(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название')
    image = models.ImageField(upload_to='photos/', verbose_name='Изображение')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Фотография'
        verbose_name_plural = 'Фотографии'
        ordering = ['-created_at']
