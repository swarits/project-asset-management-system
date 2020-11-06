from django.db import models
from datetime import datetime


class Asset(models.Model):
    name = models.CharField(max_length=20)
    category = models.CharField(max_length=15)
    date_created = models.DateTimeField(default=datetime.now)
    client_id = models.IntegerField()
    status = models.CharField(max_length=20, default='available')


class AssetArchive(models.Model):
    asset_id = models.IntegerField()
    asignee_id = models.IntegerField()
    issue_date = models.DateTimeField(default=datetime.now)
    return_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(null=True, blank=True,default='requested', max_length=20)

