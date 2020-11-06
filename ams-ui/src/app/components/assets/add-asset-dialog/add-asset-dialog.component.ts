import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-asset-dialog',
  templateUrl: './add-asset-dialog.component.html',
  styleUrls: ['./add-asset-dialog.component.css']
})
export class AddAssetDialogComponent implements OnInit {

  public category = null;

  constructor(private assetService: AssetService,
    private dialogRef: MatDialogRef<AddAssetDialogComponent>,
    private snackBar: SnackBarService,
  ) { }

  ngOnInit() {
  }

  name = new FormControl('', [Validators.required, Validators.pattern(/^[\sA-Za-z0-9]+$/)]);

  closeDialog() {
    this.dialogRef.close();
  }

  addAsset() {

      let details = {
        "name": this.name.value,
        "category": this.category,
        "user_id": localStorage.getItem('id'),
        "client_id": localStorage.getItem('client_id')
      }

      this.assetService.addAsset(details)
        .subscribe(response => {
          this.snackBar.openSnackBar(response.body.message, "");
          this.closeDialog();
        }, error => {
          this.snackBar.openSnackBar(error.error.message, "");
        });


  }

}
