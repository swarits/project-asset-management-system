import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  constructor( private router: Router, private userService: UserService,private snackbar: SnackBarService) { }

  ngOnInit() {
  }

  email_form_control = new FormControl('', [Validators.required, Validators.email]);
  password_form_control = new FormControl('', [Validators.required]);


  getEmailErrorMessage() {
    return this.email_form_control.hasError('email') ? 'Not a valid email' : '';
  }

  signIn() {
    let signinData = {
      "email": this.email_form_control.value,
      "user_password": this.password_form_control.value
    }
    this.userService.signIn(signinData)
      .subscribe(response => {
        this.setSignInData(response.body);

        if(response.body.status == 200)
          this.router.navigateByUrl('/assets');

        this.snackbar.openSnackBar(response.body.message, "");
        console.log(response.body.info);
        for(let key in response.body.info)
            localStorage.setItem(key, response.body.info[key]);
        
      },
        error => {
          console.log(error)
          this.snackbar.openSnackBar(error.error.message, "");
        });

  }

  setSignInData(response) {
    window.localStorage.setItem("userId", response['id']);
    window.localStorage.setItem("email", response['email'])
    window.localStorage.setItem("firstname", response['firstname']);
    window.localStorage.setItem("lastname", response['lastname']);
  }
}
