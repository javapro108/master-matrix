import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { HomeService } from '../services/home.service';


@Component({
  selector: 'header-view',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private homeService: HomeService
  ){}

  onSideNavToggle(){
    debugger;
    this.homeService.toggleSideNav();
  }
}
