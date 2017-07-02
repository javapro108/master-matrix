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
    //this.router.navigate(['../home']);
    debugger;
    this.loginForm.value.username;
    this.appService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(this.loginSuccess.bind(this), this.loginError.bind(this));

  }

  loginSuccess(data) {
    debugger;
    if (data.token != undefined) {
      window.localStorage.setItem("Auth-token", data.token);
      this.appService.user = data;
      this.router.navigate(['../home']);
    } else {

    }
  }

  loginError() {
    //show error
  }

}
