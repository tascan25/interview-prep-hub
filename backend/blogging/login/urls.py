from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    #auth api endpoints will go here
    path('test/',views.TestAuthView.as_view(),name='test-auth'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('register/', views.RegisterView.as_view(),name='register-view'),
    path('protected/',views.ProtectedView.as_view(),name='protected-view'),
]
