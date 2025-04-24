from django.contrib import admin
from .models import Service, ServiceImage, Products, ProductsImage, Review, Photo, FAQ, Prepayment, AccountNumber

class ServiceImageInline(admin.TabularInline):
    model = ServiceImage
    extra = 5  

class ProductsImageInline(admin.TabularInline):
    model = ProductsImage
    extra = 5  



class ServiceAdmin(admin.ModelAdmin):
    inlines = [ServiceImageInline]

class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductsImageInline]



@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('name', 'image_preview', 'text')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        return obj.image.url if obj.image else None

    image_preview.short_description = 'Image Preview'



@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    list_filter = ('created_at',)



admin.site.register(FAQ)
admin.site.register(Service, ServiceAdmin)
admin.site.register(ServiceImage)
admin.site.register(Products, ProductAdmin)
admin.site.register(ProductsImage)
admin.site.register(Prepayment)
admin.site.register(AccountNumber)
