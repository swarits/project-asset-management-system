import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import UserSerializer

logFormatter = 'Module: %(module)s Line: %(lineno)d %(asctime)s %(levelname)s:%(message)s'
logging.basicConfig(format=logFormatter, level=logging.INFO)
log = logging.getLogger(__name__)


class Signup(APIView):
    """
    signup/add an individual :model:`user.User`.

    **Context**

    ``mymodel``
        An instance of :model:`user.User`.
    """
    def post(self, request):
        email = request.data.get('email')
        firstname = request.data.get('firstname')
        lastname = request.data.get('lastname')
        password = request.data.get('user_password')
        group = request.data.get('group')

        logging.info(f'Signup request for email {email}')
        resp_data = {}
        try:
            user_data = User(email=email, firstname=firstname, lastname=lastname, password=password, group=group)
            user_data.save()
            resp_data = {'message': 'Account Created successfully', 'email': f'{email}'}
        except Exception as e:
            resp_data = {'message': 'Account already exists.'}
            logging.error(e)

        response = Response(
            resp_data,
            content_type="application/json",
            status=status.HTTP_200_OK
        )
        return response


class Login(APIView):
    """
    signup/add an individual :model:`user.User`.

    **Context**

    ``mymodel``
        An instance of :model:`user.User`.
    """
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('user_password')
        logging.info(f'Login request for email {email}')
        resp_data = {}
        try:
            db_data = User.objects.get(email=email)
            if db_data.password == password:
                serializer = UserSerializer(db_data)
                resp_data = {
                    'message': 'Logged in successfully',
                    'info': serializer.data,
                    'status': 200
                }
            else:
                resp_data = {'message': 'Password Incorrect!, Please try again', 'status': 401}
        except Exception as e:
            resp_data = {'message': 'User doesn\'t exist, Please SignUp to continue..', 'status': 401}
            logging.error(e)

        response = Response(
            resp_data,
            content_type="application/json",
            status=status.HTTP_200_OK
        )
        return response

    def get(self, request):
        resp_data = {}
        try:
            db_data = User.objects.all()
            serializer = UserSerializer(db_data, many=True)
            resp_data = {
                'All users': serializer.data
            }
        except Exception as e:
            resp_data = {'message': 'Error fetching all users'}
            logging.error(e)

        response = Response(
            resp_data,
            content_type="application/json",
            status=status.HTTP_200_OK
        )
        return response
