import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'

import { SelectItem } from 'primeng/primeng';

import { AppService } from  '../../services/app.service';
import { ContactsService } from '../../services/contacts.service';
import { CompanyService } from '../../services/company.service';
import { CompanySearchComponent } from '../../common/companysearch.component';

@Component({
  selector: 'create-contact-view',
  templateUrl: './create.component.html'
})
export class CreateComponent {

  busy: boolean = false;
  contactsForm: FormGroup;
  rxSub: Subscription;

  affiliates = [];
  disciplines = [];
  reps = [];

  disciplineOpts: SelectItem[];
  repAffiliateOpts: SelectItem[];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private contactsService: ContactsService,
    private companyService:CompanyService
  ) {
    debugger;

    this.contactsService.subscribe((data)=>this.rxUpdate(data));

    this.disciplineOpts = [];
    this.appService.disciplineOpts.forEach((option) => {
      this.disciplineOpts.push({
        label: option.label,
        value: {
          codDisciplineID: option.value,
          name: option.label
        }
      });
    });

  }

  ngOnInit(): void {
    debugger;
    this.buildForm();
  }

  ngOnDestroy() {
    this.rxSub.unsubscribe();
  }

  rxUpdate(data){
  }



  onSubmit() {
    //debugger;
    this.contactsForm.markAsPristine();

    let contactEntity = {
      contact: this.contactsForm.value,
      disciplines: this.disciplines,
      affiliates: this.affiliates,
      reps: this.reps
    };

    console.log(contactEntity);

    this.contactsService.createContact(contactEntity)
        .subscribe((data)=>this.createSuccess(data), (error)=>this.createError(error))
  }

  createSuccess(contactEntity){
    console.log('create contact success');
    console.log(contactEntity);
  }

  createError(error){
    console.log(error);
  }


  onMultiselectChange(data) {
    this.disciplines = this.contactsForm.value.codDisciplineID;
  }


  onAffiliateSelect(selectedValue, row) {
    row.cafStatus = '3';
    row.cafAffialiateID = selectedValue;
    this.updateRepAffiliateOpts();
  }

  addAffiliaterow() {
    this.affiliates = this.affiliates.slice();
    this.affiliates.push({
      "cafStatus": " ",
      "cafstatus2": " ",
      "cafAffialiateID": " ",
      "affName": " ",
      "cafContactID": " "
    });
    this.updateRepAffiliateOpts();
  }

  removeAffiliaterow(row) {
    let index = this.affiliates.indexOf(row);
    this.affiliates.splice(index, 1);
    this.affiliates = this.affiliates.slice();
    this.updateRepAffiliateOpts();
  }

  addRepsrow() {
    this.reps = this.reps.slice();
    this.reps.push({
//      "corAffialiateID": "",
//      "corContactID": "",
//      "corRepID": "",
//      "corStatus": ""
    })
  }

  removeRepsrow(row) {
    let index = this.reps.indexOf(row)
    this.reps.splice(index, 1);
    this.reps = this.reps.slice();
  }

  updateRepAffiliateOpts(){
    this.repAffiliateOpts = this.affiliates.map((data) => {
      return this.appService.arrayFind(this.appService.affiliateOpts, 'value', data.cafAffialiateID);
    });
  }

  buildForm(): void {
    this.contactsForm = this.formBuilder.group({
      conCourtesy: ['', Validators.required],
      conFName: ['', Validators.required],
      conMI: '',
      conLName: ['', Validators.required],
      conAlias: '',
      conCompanyID: [this.companyService.companyEntity.company.comID, Validators.required],
      conTitle: '',
      conPosition: ['', Validators.required],
      conDirectPhone: '',
      conExt: '',
      conCellPhone: '',
      conFaxNum: '',
      conEmail: '',
      conAssistantName: '',
      conAssistPhone: '',
      conAssistExt: '',
      conAssistEmail: '',
      conHomeAddress: '',
      conHomeAddress2: '',
      conHomeCity: '',
      conHomeState: '',
      conHomeZip: '',
      conHomePhone: '',
      conHomeFax: '',
      conHomeEmail: '',
      conBirthday: '',
      conAnniversary: '',
      conGuestName: '',
      codDisciplineID: [[]],

      //cafAffialiateID:[[]],
      cafstatus2: '',
      cafStatus: '',
    });
  }

}
