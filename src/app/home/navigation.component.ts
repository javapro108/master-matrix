import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'navigation-view',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
   constructor(private router: Router){}

}
