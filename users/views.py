from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets


from .models import Admin, Users,Product,Order
from .serializers import AdminSerializer, UsersSerializer,ProductSerializer,OrderSerializer




class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
    filter_backends = [DjangoFilterBackend]

    def create(self, request, *args, **kwargs):
        # Custom logic for creating a new user can go here
        return super().create(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        # Custom logic for listing users can go here
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        # Custom logic for retrieving a single user can go here
        return super().retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        # Custom logic for updating a user can go here
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        # Custom logic for partially updating a user can go here
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        # Custom logic for deleting a user can go here
        response=super().destroy(request, *args, **kwargs)
        print("deleted user")

        return response

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    filter_backends = [DjangoFilterBackend]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer



class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer