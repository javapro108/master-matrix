import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';


@Component({
  selector: 'create-company-view',
  templateUrl: './create.component.html'
})
export class CreateComponent {


   constructor( private contactsService:ContactsService,
                private router: Router){}

}
