import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/primeng';

import { AppService } from '../services/app.service';
import { User } from '../services/app.types';

@Component({
  selector: 'header-view',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  infoItems: MenuItem[];
  user: User;

  constructor(
    private router: Router,
    private appService: AppService
  ) {
    this.user = appService.user;
  }

  ngOnInit() {
    this.infoItems = [
/*
      { label: 'Bootstrap', icon: 'fa-picture-o', command: () => { this.changeTheme('bootstrap/theme.css'); } },
      { label: 'Cruze', icon: 'fa-picture-o', command: () => { this.changeTheme('cruze/theme.css'); } },
      { label: 'Cupertino', icon: 'fa-picture-o', command: () => { this.changeTheme('cupertino/theme.css'); } },
      { label: 'Darkness', icon: 'fa-picture-o', command: () => { this.changeTheme('darkness/theme.css'); } },
      { label: 'Flick', icon: 'fa-picture-o', command: () => { this.changeTheme('flick/theme.css'); } },
      { label: 'Home', icon: 'fa-picture-o', command: () => { this.changeTheme('home/theme.css'); } },
      { label: 'Kasper', icon: 'fa-picture-o', command: () => { this.changeTheme('kasper/theme.css'); } },
      { label: 'Lightness', icon: 'fa-picture-o', command: () => { this.changeTheme('lightness/theme.css'); } },
      { label: 'Ludvig', icon: 'fa-picture-o', command: () => { this.changeTheme('ludvig/theme.css'); } },
      { label: 'Omega', icon: 'fa-picture-o', command: () => { this.changeTheme('omega/theme.css'); } },
      { label: 'Pepper Grinder', icon: 'fa-picture-o', command: () => { this.changeTheme('pepper-grinder/theme.css'); } },
      { label: 'Redmond', icon: 'fa-picture-o', command: () => { this.changeTheme('redmond/theme.css'); } },
      { label: 'Rocket', icon: 'fa-picture-o', command: () => { this.changeTheme('rocket/theme.css'); } },
      { label: 'South Street', icon: 'fa-picture-o', command: () => { this.changeTheme('south-street/theme.css'); } },
      { label: 'Start', icon: 'fa-picture-o', command: () => { this.changeTheme('start/theme.css'); } },
      { label: 'Trontastic', icon: 'fa-picture-o', command: () => { this.changeTheme('trontastic/theme.css'); } },
      { label: 'Voclain', icon: 'fa-picture-o', command: () => { this.changeTheme('voclain/theme.css'); } }
*/
    ];
  }

  ngOnDestroy() {

  }

  changeTheme(theme:string){
    this.appService.getDocument().getElementById('theme-css').href = "themes/" + theme;
  }


  onSideNavToggle() {
    this.appService.pushData({ type: "TOGGLE-SIDE-NAV" });
  }

  showMessages() {
    this.appService.pushData({ type: "SHOW-MESSAGE" });
  }

  logOff() {
    window.localStorage.removeItem("current-user");
    this.router.navigate(['login']);
  }
}
