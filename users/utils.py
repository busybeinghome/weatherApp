import random
from django.core.mail import EmailMessage
from django.conf import settings
from .models import User, OneTimePassword
from django.contrib.sites.shortcuts import get_current_site


def send_code_to_user(email,request):
    subject = "One time passcode for Email verification"
    otp_code=random.randint(1000, 9999)
    print(otp_code)
    user=User.objects.get(email=email)
    current_site=get_current_site(request).domain
    email_body=f"Привет, {user.first_name}, спасибо за регистрацию, {current_site} пожалуйста, подтвердите свою почту \n одноразовым паролем {otp_code}"
    from_email=settings.DEFAULT_FROM_EMAIL

    OneTimePassword.objects.create(user=user, otp=otp_code)
    d_email=EmailMessage(subject=subject, body=email_body, from_email=from_email, to=[user.email])
    d_email.send(fail_silently=True)


def send_normal_email(data):
    email=EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        from_email=settings.EMAIL_HOST_USER,
        to=[data['to_email']]
    )
    email.send()