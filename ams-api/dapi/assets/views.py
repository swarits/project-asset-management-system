import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import dateparse

from .models import Asset, AssetArchive
from .serializers import AssetSerializer, AssetArchiveSerializer

from datetime import datetime

logFormatter = 'Module: %(module)s Line: %(lineno)d %(asctime)s %(levelname)s:%(message)s'
logging.basicConfig(format=logFormatter, level=logging.INFO)
log = logging.getLogger(__name__)


class AssetArchives(APIView):
    """
    Add an issued/returned asset :model:`assets.AssetArchive`.

    **Context**

    ``mymodel``
        An instance of :model:`assets.AssetArchive`.
    """
    def post(self, request):
        asset_id = request.data.get('asset_id')
        asignee_id = request.data.get('asignee_id')

        resp_data = {}
        try:
            ass_update = Asset.objects.get(id=asset_id)
            ass_update.status = 'requested'
            ass_update.save()

            asset = AssetArchive(asignee_id=asignee_id, asset_id=asset_id)
            asset.save()

            resp_data = {'message': 'Asset requested successfully'}
        except Exception as e:
            resp_data = {'message': 'Error requesting asset.'}
            logging.error(e)

        response = Response(
            resp_data,
            content_type="application/json",
            status=status.HTTP_200_OK
        )
        return response

    """
    Update(on Approve, reject asset, return asset) asset :model:`assets.AssetArchive`.

    **Context**

    ``mymodel``
        An instance of :model:`assets.AssetArchive`.
    """
    def put(self, request, archive_id):
        astatus = request.data.get('status')

        resp_data = {}
        try:

            if astatus == 'approved':
                asset = AssetArchive.objects.get(id=archive_id)
                asset_id = asset.asset_id
                asset.status = 'allocated'
                asset.save()
                a = Asset.objects.get(id=asset_id)
                a.status = 'allocated'
                a.save()
            elif astatus == 'rejected':
                asset = AssetArchive.objects.get(id=archive_id)
                asset_id = asset.asset_id
                asset.status = 'rejected'
                asset.save()
                a = Asset.objects.get(id=asset_id)
                a.status = 'available'
                a.save()
            elif astatus == 'returned':
                asset = AssetArchive.objects.get(id=archive_id)
                asset_id = asset.asset_id
                asset.status = 'returned'
                asset.return_date = datetime.now()
                asset.save()
                a = Asset.objects.get(id=asset_id)
                a.status = 'available'
                a.save()

            resp_data = {'message': f'Asset {astatus}'}
        except Exception as e:
            resp_data = {'message': 'Error occurred'}
            logging.error(e)

        response = Response(
            resp_data,
            content_type="application/json",
            status=status.HTTP_200_OK
        )
        return response

    """
    Get list of issued asset :model:`assets.AssetArchive`.

    **Context**

    ``mymodel``
        An instance of :model:`assets.AssetArchive`.
    """
    def get(self, request):
        group = request.query_params.get('group')
        user_id = request.query_params.get('user_id')

        resp_data = {}
        try:
            qs = None
            if group is not '0':
                qs = AssetArchive.objects.filter(asignee_id=user_id)
            else:
                qs = AssetArchive.objects.all()
            serializer = AssetArchiveSerializer(qs, many=True)

            resp_data = {'message': 'Success', 'data': serializer.data}
        except Exception as e:
            resp_data = {'message': 'Error fetching assets.', 'data': []}
            logging.error(e)

        response = Response(
            resp_data,
            content_type="application/json",
            status=status.HTTP_200_OK
        )
        return response


class Assets(APIView):
    """
    Add an asset :model:`assets.Asset`.

    **Context**

    ``mymodel``
        An instance of :model:`assets.Asset`.
    """
    def post(self, request):
        name = request.data.get('name')
        category = request.data.get('category')
        client_id = request.data.get('client_id')

        logging.info(f'Creating asset {request.data}')
        resp_data = {}
        try:
            asset = Asset(name=name, category=category, client_id=client_id)
            asset.save()

            resp_data = {'message': 'Asset Added successfully'}
        except Exception as e:
            resp_data = {'message': 'Error adding asset.'}
            logging.error(e)

        response = Response(
            resp_data,
            content_type="application/json",
            status=status.HTTP_200_OK
        )
        return response

    """
    Get list of all assets :model:`assets.Asset`.

    **Context**

    ``mymodel``
        An instance of :model:`assets.Asset`.
    """
    def get(self, request):
        client_id = request.query_params.get('client_id')
        group = request.query_params.get('group')

        resp_data = {}
        try:
            if group is '0':
                qs = Asset.objects.filter(client_id=client_id)
            else:
                qs = Asset.objects.filter(client_id=client_id, status='available')

            serializer = AssetSerializer(qs, many=True)

            resp_data = {'message': 'Success', 'data': serializer.data}
        except Exception as e:
            resp_data = {'message': 'Error fetching assets.', 'data': []}
            logging.error(e)

        response = Response(
            resp_data,
            content_type="application/json",
            status=status.HTTP_200_OK
        )
        return response

    """
    User :model:`user.User`
    Updates status of an asset :model:`assets.Asset`.

    **Context**

    ``mymodel``
        An instance of :model:`assets.Asset`.
    """
    def put(self, request, asset_id):
        asset_status = request.data.get('status')
        user_id = request.data.get('user_id')

        resp_data = {}
        try:
            asset = Asset.objects.get(id=asset_id)
            asset.status = asset_status
            asset.save()

            resp_data = {'message': f'Asset {asset_status} successfully'}
        except Exception as e:
            resp_data = {'message': 'Error updating asset status.'}
            logging.error(e)

        response = Response(
            resp_data,
            content_type="application/json",
            status=status.HTTP_200_OK
        )
        return response

    """
    Delete an asset :model:`assets.Asset`.

    **Context**

    ``mymodel``
        An instance of :model:`assets.Asset`.
    """
    def delete(self, request, asset_id):
        resp_data = {}
        try:
            asset = Asset.objects.get(id=asset_id)
            asset.delete()

            resp_data = {'message': 'Asset Deleted Successfully'}
        except Exception as e:
            resp_data = {'message': 'Error deleting asset'}
            logging.error(e)

        response = Response(
            resp_data,
            content_type="application/json",
            status=status.HTTP_200_OK
        )
        return response
