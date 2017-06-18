import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'navigation-view',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {

  navLinks = [{
    id: 'Overview',
    icon: '',
    text: 'Overview',
    path: './overview',
  },
  {
    id: 'Company',
    icon: '',
    text: 'Company',
    path: './company',
    childLinks: [{
      id: 'CreateCompany',
      icon: '',
      text: 'Create Company',
      path: './createcompany',
    },
    {
      id: 'Create',
      icon: '',
      text: 'Overview',
      path: './overview',
    }]
  }
  ]

  constructor(private router: Router){}


}
