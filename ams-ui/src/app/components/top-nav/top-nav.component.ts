import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  name = null;
  constructor(private router: Router, private snackBar: SnackBarService) { }

  ngOnInit() {
    this.name = window.localStorage.getItem('firstname') +" " + window.localStorage.getItem('lastname');
  }

  signOut() {
    //TODO: call api
    localStorage.clear();
    this.router.navigateByUrl('/login');
    this.snackBar.openSnackBar("Successfully logged out.", "");
  }

}
