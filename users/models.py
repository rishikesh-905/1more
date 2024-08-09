from django.db import models
class Users(models.Model):
    username=models.CharField(max_length=120)
    email=models.EmailField(unique=True)
    password=models.CharField(max_length=120)

    def __str__(self) -> str:
        return self.email
       
class Admin(models.Model):
    username=models.CharField(max_length=120)
    email=models.EmailField(unique=True)
    password=models.CharField(max_length=120)

    def __str__(self) -> str:
        return self.email
    
class Product(models.Model):
    name = models.CharField(max_length=255)
    sku = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    supplier = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ]

    PAYMENT_STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Paid', 'Paid'),
        ('Failed', 'Failed'),
    ]

    PAYMENT_METHOD_CHOICES = [
        ('Credit Card', 'Credit Card'),
        ('PayPal', 'PayPal'),
        ('Bank Transfer', 'Bank Transfer'),
    ]

    product = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    order_date = models.DateField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
    customer = models.CharField(max_length=100)
    payment_status = models.CharField(max_length=50, choices=PAYMENT_STATUS_CHOICES, default='Pending')
    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHOD_CHOICES, default='Credit Card')

    def __str__(self):
        return f"{self.product} - {self.customer}"
