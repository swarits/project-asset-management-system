import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AssetService } from 'src/app/services/asset.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import {MatDialog} from '@angular/material/dialog';
import { AddAssetDialogComponent } from './add-asset-dialog/add-asset-dialog.component';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  assets: any;
  categories = [];
  mainCats = ['software', 'hardware'];
  requestedAssets: any;
  group: string;

  constructor(private dialog: MatDialog, private assetService: AssetService, private snackBar: SnackBarService,
  ) { }

  ngOnInit(): void {
    this.getAssets();
    this.group = localStorage.getItem('group')
  }

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  close() {
    this.sidenav.close();
  }

  getAssets() {
    let clientId = localStorage.getItem('client_id');
    let group = localStorage.getItem('group');

    if (clientId != null) {
      this.assetService.getAssets(clientId, group).subscribe(response => {
        this.requestedAssets = response.data;

        this.requestedAssets.forEach(function (asset) {
          asset['date_created'] = new Date(asset['date_created']).toLocaleString()
        });
          
        this.assets = this.requestedAssets;
      }, error => {
        this.snackBar.openSnackBar(error.error.message, "");
      });

    }

  }

  checkCategory(category, event) {
    if (event.checked == true && !this.categories.includes(category)) {
      this.categories.push(category);
    } else if (event.checked == false && this.categories.includes(category)) {
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i] == category) {
          delete this.categories[i];
        }
      }
    }
  }

  applyFilters() {
    this.assets = [];
    for (let i = 0; i < this.requestedAssets.length; i++) {
      if(this.categories.includes(this.requestedAssets[i]['category']))
        this.assets.push(this.requestedAssets[i])
    }
  }

  resetFilters() {
    this.assets = this.requestedAssets;
    this.categories = [];
  }

  addAsset() {
    this.dialog.open(AddAssetDialogComponent);
    this.dialog.afterAllClosed.subscribe(res => {
      this.getAssets();
    });
  }

  requestAsset(assetId) {
    let data = { 'asignee_id': localStorage.getItem('id'), 'asset_id': assetId}
    this.assetService.requestAsset(data).subscribe(response => {
      this.snackBar.openSnackBar(response.body.message, "");
      this.getAssets();
    }, error => {
      this.snackBar.openSnackBar(error.error.message, "");
    });
  }

}
