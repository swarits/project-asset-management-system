"""ams user URL Configuration
The `urlpatterns` list routes URLs to Signup and Login class based views
"""

from .views import Signup, Login
from django.urls import path

urlpatterns = [
	path('signup/', Signup.as_view(), name='signup'),
	path('login/', Login.as_view(), name='login')
]
