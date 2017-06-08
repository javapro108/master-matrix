import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'login-view',
  templateUrl: './login.component.html'
})
export class LoginComponent {
   uname:String
   pass:String

   constructor(private loginService:LoginService,
               private router: Router){}

   onLogin(){
     this.loginService.login(this.uname, this.pass).subscribe(this.loginSuccess.bind(this), this.loginError.bind(this));
   }

   loginSuccess(data){
     window.localStorage.setItem("Auth-token", data.token);
     debugger;
     this.router.navigate(['../home']);
   }

   loginError(){
     //show error
   }

}
