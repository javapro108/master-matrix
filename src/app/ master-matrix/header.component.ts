import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'header-view',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
   constructor(private router: Router){}

}
