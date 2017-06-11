import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'search-company-view',
  templateUrl: './search.component.html'
})
export class SearchComponent {


   constructor( private companyService:ContactsService,
                private router: Router){}

}
