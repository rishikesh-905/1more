from django.contrib import admin
from django.urls import path, include
from .views import root_view  # Import the new root view
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', root_view, name='root'),          # Handle the root URL
    path('api/', include('users.urls')),       # Prefix URLs with 'api/'
]

# Serve static and media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
