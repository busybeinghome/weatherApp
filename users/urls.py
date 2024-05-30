from django.urls import path
from .views import (RegisterUserView,
                    LoginUserView,
                    TestAuthenticationView,
                    PasswordResetConfirm,
                    PasswordResetRequestView,
                    SetNewPasswordView,
                    LogoutUserView
                    )

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/',LoginUserView.as_view(),name='login'),
    path('profile/', TestAuthenticationView.as_view(), name='granted'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirm.as_view(), name='reset-password-confirm'),
    path('set-new-password/', SetNewPasswordView.as_view(), name='set-new-password'),
    path('logout/', LogoutUserView.as_view(), name='logout')
  ]