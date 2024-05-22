from django.urls import path
from .views import RegisterView, ObtainTokenPairView, UserView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', ObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('current-user/', UserView.as_view(), name='current-user'),
  ]