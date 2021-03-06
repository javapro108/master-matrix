import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {SelectItem} from 'primeng/primeng';

import { AppService } from  '../../services/app.service';
import { ContactsService } from '../../services/contacts.service';
import { FindResult } from '../../services/contacts.types';

@Component({
  selector: 'search-company-view',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

  busy: Boolean = false;
  cols: any[];
  columnOptions: SelectItem[];
  selectedColumns: SelectItem[];
  searchForm: FormGroup;
  findResults: FindResult[];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private builder: FormBuilder,
    private appService: AppService,
    private contactsService: ContactsService
  ) {
    this.searchForm = this.builder.group({
      conName: [this.contactsService.contactEntity.findParams.conName, Validators.required],
      conActive: [this.contactsService.contactEntity.findParams.conActive],
      conInactive: [this.contactsService.contactEntity.findParams.conInactive]
    });
  }


  ngOnInit() {

    this.cols = [
      //        {field: 'conID', header: 'ID', width:{'width':'5%'}},
      { field: 'conID', header: 'ID', display: true, width:{'width':'5%'}},
      { field: 'conFName', header: 'First Name', display: true, width:{'width':'12%'} },
      { field: 'conLName', header: 'Last Name', display: true,width:{'width':'12%'} },
      { field: 'conTitle', header: 'Title', display: true,width:{'width':'10%'} },
      { field: 'conDirectPhone', header: 'Direct Phone', display: true,width:{'width':'12%'} },
      { field: 'comName', header: 'Company Name', display: true,width:{'width':'20%'} },
      { field: 'actDate', header: 'Last Contacted', display: true,width:{'width':'12%'} },
      { field: 'comDistrict', header: 'District', display: true,width:{'width':'12%'} },
      { field: 'comPhone', header: 'Company Phone',width:{'width':'12%'} },
      { field: 'conAlias', header: 'Alias',width:{'width':'12%'} },
      { field: 'conPosition', header: 'Position',width:{'width':'10%'} },
      { field: 'conEmail', header: 'Email',width:{'width':'12%'} }
    ];

    this.columnOptions = this.cols.map((column) => {
      return {
        label: column.header,
        value: column
      };
    });

    this.selectedColumns = this.cols.filter((column) => {
      return (column.display == true ? true : false);
    });

    this.findResults = this.contactsService.contactEntity.findResults;

  }

  ngOnDestroy(){

  }

  onFind() {

    this.contactsService.contactEntity.findParams = this.searchForm.value;

    // if both active and inactive selected then call findContactsAdvAll
    if (this.contactsService.contactEntity.findParams.conInactive == true
      && this.contactsService.contactEntity.findParams.conActive == true) {
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
    this.busy = true;
  }


  displayContact(contact) {
    //    this.companyService.pushData({ type:'DISPLAY-FROM-SEARCH', data:company.comID });
    this.router.navigate(['../display', contact.conID], { relativeTo: this.activeRoute });
  }

  changeContact(contact) {
    //    this.companyService.pushData({ type:'CHANGE-FROM-SEARCH', data:company.comID });
    this.router.navigate(['../change', contact.conID], { relativeTo: this.activeRoute });
  }


  findSuccess(findResult) {

    this.busy = false;
    this.contactsService.contactEntity.findResults = findResult.findResults.map((contact)=>{
      contact.actDate = this.appService.formatDate(contact.actDate);
      return contact;
    });
    this.findResults = this.contactsService.contactEntity.findResults;
  }


  findError(error) {

    this.busy = false;
    this.findResults = [];
    this.contactsService.contactEntity.findResults = [];
    if (error.status = 401) {
      this.appService.pushData({type:"SHOW-LOGIN"});
    } else {
      console.log(error);
    }

  }

}
