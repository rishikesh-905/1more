from rest_framework import serializers,status
from rest_framework.response import Response


from .models import Admin, Users,Product,Order

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

    def create(self, validated_data):
        user = super().create(validated_data)
   
        return user

   
class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

    def create(self, validated_data):
        user = super().create(validated_data)
   
        return user
    



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'



class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'