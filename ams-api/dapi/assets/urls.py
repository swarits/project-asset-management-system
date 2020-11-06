from .views import Assets, AssetArchives
from django.urls import path

urlpatterns = [
    path('', Assets.as_view(), name='asset'),
    path('<int:asset_id>/', Assets.as_view(), name='asset-update_delete'),
    path('assign/', AssetArchives.as_view(), name='asset-assigned'),
    path('assign/<int:archive_id>/', AssetArchives.as_view(), name='asset-return')

]
