import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';


@Component({
  selector: 'change-company-view',
  templateUrl: './change.component.html'
})
export class ChangeComponent {

   constructor( private contactsService:ContactsService,
                private router: Router){}

}
