import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';


@Component({
  selector: 'display-contacts-view',
  templateUrl: './display.component.html'
})
export class DisplayComponent {


   constructor( private contactsService:ContactsService,
                private router: Router){}

}
