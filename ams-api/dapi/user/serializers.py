from rest_framework import serializers
from .models import User

"""
	Serializer for Model user
	return: Serialized object containing id, email, firstname, lastname, group, client_id 
"""
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "firstname", "lastname", "group", "client_id")
