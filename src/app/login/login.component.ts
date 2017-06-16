import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { LoginService } from '../services/login.service';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'login-view',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username = new FormControl('');
  password = new FormControl('');

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private loginService:LoginService,
    private homeService:HomeService
  ){}

  loginForm: FormGroup = this.builder.group({
    username: this.username,
    password: this.password
  });

  onLogin(){
   //this.router.navigate(['../home']);
   debugger;
   this.loginForm.value.username;
   this.loginService.login(this.loginForm.value.username, this.loginForm.value.password)
       .subscribe(this.loginSuccess.bind(this), this.loginError.bind(this));

  }

  loginSuccess(data){
   debugger;
   if (data.token != undefined) {
     window.localStorage.setItem("Auth-token", data.token);
     this.homeService.user = data;
     this.router.navigate(['../home']);
   } else {

   }
  }

  loginError(){
   //show error
  }

}
