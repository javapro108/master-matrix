import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'search-company-view',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private contactsService:ContactsService
  ){}

  searchForm: FormGroup = this.builder.group({
    conName:     [this.contactsService.contactEntity.findParams.conName,     Validators.required],
    conActive:   [this.contactsService.contactEntity.findParams.conActive],
    conInactive: [this.contactsService.contactEntity.findParams.conInactive],
  });

  onFind(){
    debugger;
    this.contactsService.contactEntity.findParams = this.searchForm.value;
    // if both active and inactive selected then call findContactsAdvAll
    if ( this.contactsService.contactEntity.findParams.conInactive == true
      && this.contactsService.contactEntity.findParams.conActive == true ) {
         this.contactsService.findContactsAdvAll(this.contactsService.contactEntity)
            .subscribe(this.findSuccess.bind(this), this.findError.bind(this));
    } else { //else  call findContactsAdv
      // set Inactive to false if active checkboc is selected.
      if (this.contactsService.contactEntity.findParams.conActive == true) {
        this.contactsService.contactEntity.findParams.conInactive = false;
      }
      this.contactsService.findContactsAdv(this.contactsService.contactEntity)
          .subscribe(this.findSuccess.bind(this), this.findError.bind(this));
    }
  }

  findSuccess(findResult){
    debugger;
    this.contactsService.contactEntity.findResults = findResult.findResults;
  }
  findError(error){
    debugger;
    console.log(error);
  }

}
