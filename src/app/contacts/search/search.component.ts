import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'search-company-view',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit{



  constructor(
    private router: Router,
    private builder: FormBuilder,
    private contactsService:ContactsService
  ){

  }

  columnOptions: SelectItem[];
  cols: any[];

  ngOnInit() {

    this.cols = [
        {field: 'conID', header: 'ID', width:{'width':'7%'} },
        {field: 'conFName', header: 'First Name', width:{'width':'14%'} },
        {field: 'conLName', header: 'Last Name', width:{'width':'14%'} },
        {field: 'conTitle', header: 'Title', width:{'width':'12%'} },
        {field: 'conDirectPhone', header: 'Direct Phone', width:{'width':'17%'} },
        {field: 'comName', header: 'Company Name', width:{'width':'30%'} },
        {field: 'actDate', header: 'Last Contacted', width:{'width':'17%'} },

        {field: 'comPhone', header: 'Company Phone' },
        {field: 'conAlias', header: 'Alias'},
        {field: 'conPosition', header: 'Position'},
        {field: 'conEmail', header: 'Email', },
        {field: 'comDistrict', header: 'District', }
    ];

    this.columnOptions = [];
    for(let i = 0; i < this.cols.length; i++) {
        this.columnOptions.push({label: this.cols[i].header, value: this.cols[i]});
    }

  }


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
      } else {
        this.contactsService.contactEntity.findParams.conInactive = true;
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
