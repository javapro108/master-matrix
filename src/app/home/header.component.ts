import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { AppService } from '../services/app.service';


@Component({
  selector: 'header-view',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private appService: AppService
  ){}

  onSideNavToggle(){
    debugger;
    this.appService.toggleSideNav();
  }

  showMessages(){
    this.appService.pushData({type:"SHOW-MESSAGE"});
  }

  logOff(){
    window.localStorage.removeItem("Auth-token");
    this.router.navigate(['login']);
  }
}
