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
    if (data.token != undefined) {
      window.localStorage.setItem("Auth-token", data.token);
      this.appService.user = data;
      this.router.navigate(['../home']);
    } else {
      this.appService.showMessage("Invalid valid username or password.");
    }
  }

  loginError(error) {
    console.log(error);
    this.appService.showMessage("Login error, please try again");
  }
}
