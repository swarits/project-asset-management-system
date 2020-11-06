import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginnav',
  templateUrl: './loginnav.component.html',
  styleUrls: ['./loginnav.component.css']
})
export class LoginnavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  signUp(){
    this.router.navigateByUrl('/');
  }

}
