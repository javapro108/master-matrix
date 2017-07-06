import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/primeng';

import { AppService } from '../services/app.service';

@Component({
  selector: 'navigation-view',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit, OnDestroy {
  navItems: MenuItem[];

  constructor(
    private router: Router,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.navItems = [{
      label:'Company',
      icon:'fa fa-sitemap',
      items:[{
          label:'Find Company',
          icon:'fa fa-search',
          routerLink: ['company/find']
        },
        {
          label:'Create Company',
          icon:'fa fa-file',
          routerLink: ['company/create']
        }]
    },
    {
      label:'Contacts',
      icon:'fa fa-users',
      items:[{
          label:'Find Contacts',
          icon:'fa fa-search',
          routerLink: ['contacts/find']
        },
        {
          label:'Create Contacts',
          icon:'fa fa-file',
          routerLink: ['contacts/create']
        }]
    }]
  }

  ngOnDestroy(){

  }

}
