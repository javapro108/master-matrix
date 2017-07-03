import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { AppService } from '../services/app.service';

@Component({
  selector: 'login-view',
  templateUrl: './login.component.html',
  styleUrls: ['/login.styles.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  username = new FormControl('');
  password = new FormControl('');
  loginForm: FormGroup;
  loginMessage: string;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy() {

  }

  buildForm() {
    this.loginForm = this.builder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      })

  };

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.onLogin
    }
  }

  onLogin() {
    this.loginForm.value.username;
    this.appService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((data)=> this.loginSuccess(data), (error)=>this.loginError(error));
  }

  loginSuccess(data) {
    if (data.token) {
      debugger;
      this.appService.setLoginUser(data);
      this.router.navigate(['../home']);
    } else {
      this.loginMessage = "Invalid valid username or password.";
      //this.appService.showMessage("Invalid valid username or password.");
    }
  }

  loginError(error) {
    console.log(error);
    this.loginMessage = "Login error, please try again" ;
    //this.appService.showMessage("Login error, please try again");
  }
}
