from django.contrib import admin
from users.models import Users,Admin,Product,Order

class UserAdmin(admin.ModelAdmin):
    list_display=['username','email']
    list_editable=['email']

class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'sku', 'price', 'stock', 'supplier', 'category']
    list_editable = ['price', 'stock', 'supplier', 'category']

class OrderAdmin(admin.ModelAdmin):
    list_display = ('product', 'quantity', 'order_date', 'status', 'customer', 'payment_status', 'payment_method')
    list_filter = ('status', 'payment_status', 'payment_method')
    search_fields = ('product', 'customer')
    ordering = ('order_date',)


# Register your models here.
admin.site.register(Users,UserAdmin)
admin.site.register(Admin)
admin.site.register(Product,ProductAdmin)
admin.site.register(Order)
