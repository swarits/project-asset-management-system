import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {
  requestedAssets: any;
  assets: any;
  group: string;

  constructor(private assetService: AssetService, private snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.getAssets()
    this.group = localStorage.getItem('group')
  }

  getAssets() {
    let user_id = localStorage.getItem('id');
    let group = localStorage.getItem('group');
    if (user_id != null) {
      this.assetService.getArchiveAssets(user_id, group).subscribe(response => {
        this.requestedAssets = response.data;

        this.requestedAssets.forEach(function (asset) {
          asset['issue_date'] = new Date(asset['issue_date']).toLocaleString()
          asset['return_date'] = asset['return_date'] == null ? null : new Date(asset['return_date']).toLocaleString()
        });

        this.assets = this.requestedAssets;
      }, error => {
        this.snackBar.openSnackBar(error.error.message, "");
      });

    }

  }

  approveRequest(archiveId) {
    let data = { "archive_id": archiveId, "status": "approved" }
    this.assetService.updateArchiveAsset(data, archiveId).subscribe(response => {
      this.snackBar.openSnackBar(response.body.message, "");
      this.getAssets();
    }, error => {
      this.snackBar.openSnackBar(error.error.message, "");
    });
  }

  rejectRequest(archiveId) {
    let data = { "archive_id": archiveId, "status": "rejected" }
    this.assetService.updateArchiveAsset(data, archiveId).subscribe(response => {
      this.snackBar.openSnackBar(response.body.message, "");
      this.getAssets();
    }, error => {
      this.snackBar.openSnackBar(error.error.message, "");
    });
  }
  returnRequest(archiveId) {
    let data = { "archive_id": archiveId, "status": "returned" }
    this.assetService.updateArchiveAsset(data, archiveId).subscribe(response => {
      this.snackBar.openSnackBar(response.body.message, "");
      this.getAssets();
    }, error => {
      this.snackBar.openSnackBar(error.error.message, "");
    });
  }
}
