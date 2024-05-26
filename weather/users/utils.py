import random
from django.core.mail import EmailMessage
from django.conf import settings
from .models import User, OneTimePassword

def generateOtp():
    otp=""
    for i in range(6):
        otp+=str(random.randint(1,9))
    return otp

def send_code_to_user(email):
    subject = "One time passcode for Email verification"
    otp_code=generateOtp()
    print(otp_code)
    user=User.objects.get(email=email)
    current_site="myAuth.com"
    email_body=f"Привет, {user.first_name}, спасибо за регистрацию, {current_site} пожалуйста, подтвердите свою почту \n одноразовым паролем {otp_code}"
    from_email=settings.DEFAULT_FROM_EMAIL

    OneTimePassword.objects.create(user=user, code=otp_code)
    d_email=EmailMessage(subject=subject, body=email_body, from_email=from_email, to=[user.email])
    d_email.send(fail_silently=True)