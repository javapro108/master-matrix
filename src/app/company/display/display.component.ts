import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'display-contacts-view',
  templateUrl: './display.component.html'
})
export class DisplayComponent {


   constructor( private companyService:CompanyService,
                private router: Router){}

}
