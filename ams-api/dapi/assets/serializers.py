from rest_framework import serializers
from .models import Asset, AssetArchive


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ("id", "name", "category", "date_created", "client_id", "status")


class AssetArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetArchive
        fields = ("id", "asset_id", "asignee_id", "issue_date", "return_date", "status")
