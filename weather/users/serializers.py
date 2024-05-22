from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password2 = validated_data.pop('password2')
        if validated_data['password'] != password2:
            raise serializers.ValidationError({'password': "Пароли не совпадают"})
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user