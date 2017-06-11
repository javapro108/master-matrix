import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'change-company-view',
  templateUrl: './change.component.html'
})
export class ChangeComponent {

   constructor( private companyService:CompanyService,
                private router: Router){}

}
