from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import AdminViewSet, UsersViewSet,ProductViewSet,OrderViewSet

router = DefaultRouter()
router.register(r'users', UsersViewSet)
router.register(r'admin', AdminViewSet)
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)


urlpatterns = [
    path('', include(router.urls)),
]