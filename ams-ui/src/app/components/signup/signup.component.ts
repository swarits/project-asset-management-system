import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;
  hide2 = true;

  public lastname = null;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService, private snackBar: SnackBarService) { }

  ngOnInit() {

  }

  email_form_control = new FormControl('', [Validators.required, Validators.email]);
  firstname_form_control = new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]);

  checkTns = false;

  matcher = new MyErrorStateMatcher();

  signupForm = this.fb.group({
    password: ['', [Validators.required]],
    confirmPassword: ['']
  }, { validator: this.checkPasswords })

  getEmailErrorMessage() {
    return this.email_form_control.hasError('email') ? 'Not a valid email' : '';
  }

  getNameErrorMessage() {
    return this.firstname_form_control.hasError('firstname') ? '' : 'First name must contain only characters';
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  resetSignupData() {
    this.email_form_control.reset();
    this.firstname_form_control.reset();
    this.signupForm.reset();
    this.lastname = null;
    this.checkTns = false;
  }


  signUp() {
    let signupData = {
      "email": this.email_form_control.value,
      "firstname": this.firstname_form_control.value,
      "lastname": this.lastname,
      "user_password": this.signupForm.get("password").value,
      "user_matching_password": this.signupForm.get('confirmPassword').value,
      // user signed up is general not admin
      "group": 1
    }
    this.userService.signUp(signupData).subscribe(response => {
      this.snackBar.openSnackBar(response.body.message, "");
      this.router.navigateByUrl('/login');
      this.resetSignupData();
    },
      error => {
        this.snackBar.openSnackBar(error.error.message, "");
        this.resetSignupData();
      }
    );
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}