
from .serializers import UserRegisterSerializer, LoginSerializer, SetNewPasswordSerializer, PasswordResetRequestSerializer, LogoutUserSerializer
from django.shortcuts import render 
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
#from .utils import send_code_to_user
#from .models import OneTimePassword
from rest_framework.permissions import IsAuthenticated
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .models import User


class RegisterUserView(GenericAPIView):
    serializer_class = UserRegisterSerializer
    def post(self,request):
        user_data=request.data
        serializer=self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user=serializer.data
            return Response({
                'data':user,
                'message':f'Приветствуем, спасибо за регистрацию'
            },status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
'''
class VerifyUserEmail(GenericAPIView):
    def post(self, request):
        try:
            passcode = request.data.get('otp')
            user_code_obj=OneTimePassword.objects.get(otp=passcode)
            user=user_code_obj.user
            if not user.is_verified:
                user.is_verified=True
                user.save()
                return Response({
                    'message':'account email verified successfully'
                }, status=status.HTTP_200_OK)
            return Response({'message':'passcode is invalid user is already verified'}, status=status.HTTP_204_NO_CONTENT)
        except OneTimePassword.DoesNotExist as identifier:
            return Response({'message':'passcode not provided'}, status=status.HTTP_400_BAD_REQUEST)
'''     


class LoginUserView(GenericAPIView):
    serializer_class=LoginSerializer
    def post(self,request):
        serializer= self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class TestAuthenticationView(GenericAPIView):
    permission_classes=[IsAuthenticated]

    def get(self, request):

        data={
            'msg':'its works'
        }
        return Response(data, status=status.HTTP_200_OK)
    

class PasswordResetRequestView(GenericAPIView):
    serializer_class=PasswordResetRequestSerializer

    def post(self, request):
        serializer=self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response({'message':'Вам отправлена ссылка для изменения пароля'}, status=status.HTTP_200_OK)
    

class PasswordResetConfirm(GenericAPIView):

    def get(self, request, uidb64, token):
        try:
            user_id=smart_str(urlsafe_base64_decode(uidb64))
            user=User.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'message':'Токен недействителен или статус его действия истек'}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({'success':True, 'message':'Учетные данные действительны', 'uidb64':uidb64, 'token':token}, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError as identifier:
            return Response({'message':'Токен недействителен или статус его действия истек'}, status=status.HTTP_401_UNAUTHORIZED)


class SetNewPasswordView(GenericAPIView):
    serializer_class=SetNewPasswordSerializer

    def patch(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success':True, 'message':"Пароль успешно изменен"}, status=status.HTTP_200_OK)
    


class LogoutUserView(GenericAPIView):
    serializer_class=LogoutUserSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)