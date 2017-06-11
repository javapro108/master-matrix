import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
  selector: 'search-company-view',
  templateUrl: './search.component.html'
})
export class SearchComponent {

   constructor( private companyService:CompanyService,
                private router: Router){}

}
