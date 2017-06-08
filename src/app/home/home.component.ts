import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'home-view',
  templateUrl: './home.component.html'
})
export class HomeComponent {
   constructor(private router: Router){}

}
