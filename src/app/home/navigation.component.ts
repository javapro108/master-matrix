import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/primeng';

import { AppService } from '../services/app.service';

@Component({
  selector: 'navigation-view',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  private navItems: MenuItem[];

  constructor(
    private router: Router,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.navItems = [{
      label:'Overview',
      icon:'',
      routerLink: ['overview']
    },
    {
      label:'Company',
      icon:'',
      items:[{
          label:'Find Company',
          icon:'',
          routerLink: ['company/find']
        },
        {
          label:'Create Company',
          icon:'',
          routerLink: ['company/create']
        }]
    },
    {
      label:'Contacts',
      icon:'',
      items:[{
          label:'Find Contacts',
          icon:'',
          routerLink: ['contacts/find']
        },
        {
          label:'Create Contacts',
          icon:'',
          routerLink: ['contacts/create']
        }]
    }]
  }

}
