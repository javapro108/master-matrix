import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'

import { SelectItem } from 'primeng/primeng';

import { BaseComponent } from  '../../common/base.component';

import { AppService } from  '../../services/app.service';
import { ContactsService } from '../../services/contacts.service';
import { CompanyService } from '../../services/company.service';
import { CompanySearchComponent } from '../../common/companysearch.component';

@Component({
  selector: 'create-contact-view',
  templateUrl: './create.component.html'
})
export class CreateComponent extends BaseComponent implements OnInit, OnDestroy {

  busy: boolean = false;
  error: boolean = false;
  contactsForm: FormGroup;
  rxSub: Subscription;

  duplicateContacts: any;
  showDuplicate: boolean;

  affiliates = [];
  disciplines = [];
  reps = [];

  disciplineOpts: SelectItem[];
  repAffiliateOpts: SelectItem[];

  constructor(
    private router: Router,
    private location: Location,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private contactsService: ContactsService,
    private companyService:CompanyService
  ) {
    super();
    this.contactsService.subscribe((data)=>this.rxUpdate(data));
  }

  ngOnInit(): void {
    this.rxSub = this.contactsService.subscribe((data)=>this.rxUpdate(data));
    this.buildForm();
  }

  ngOnDestroy() {
    this.rxSub.unsubscribe();
  }

  rxUpdate(data){
  }

  onBlurName(){
    if (this.contactsForm.value.conFName && this.contactsForm.value.conLName){
      this.contactsService.newCheck(this.contactsForm.value.conFName, this.contactsForm.value.conLName)
          .subscribe((data) => this.newCheckResults(data));
    }
  }

  newCheckResults(duplicateContacts) {
    this.duplicateContacts = duplicateContacts;
    if (this.duplicateContacts.length > 0){
      this.showDuplicate = true;
    }
  }

  onSubmit() {
    this.contactsForm.markAsPristine();
    let disciplinesSend: any[];
    let affiliatesSend: any[];
    let repsSend: any[];

    disciplinesSend = this.disciplines.filter( (discipline)=> discipline.codDisciplineID ).map((discipline)=>{
      discipline.mode = "I";
      return discipline
    });

    affiliatesSend = this.affiliates.filter((affiliate)=> affiliate.cafAffialiateID).map((affiliate)=>{
      affiliate.mode = "I";
      return affiliate;
    });

    repsSend = this.reps.filter((rep)=>rep.corRepID && rep.corAffialiateID ).map((rep)=>{
      rep.mode = "I";
      return rep;
    });

    if(disciplinesSend.length == 0){
      this.appService.showMessage("Please enter disciplines");
      return;
    }

    if(affiliatesSend.length == 0){
      this.appService.showMessage("Please enter affiliates");
      return;
    }

    if(repsSend.length == 0){
      this.appService.showMessage("Please enter reps");
      return;
    }

    let contactEntity = {
      contact: this.contactsForm.value,
      disciplines: disciplinesSend,
      affiliates: affiliatesSend,
      reps: repsSend
    };

    this.busy = true;

    this.contactsService.createContact(contactEntity)
        .subscribe((data)=>this.createSuccess(data), (error)=>this.createError(error));

  }

  createSuccess(contactEntity){
    this.busy = false;
    console.log('create contact success');
    console.log(contactEntity);
    this.appService.showMessage("Contact " + contactEntity.contact.conID + " created successfully.", "Success");

    this.affiliates = [];
    this.disciplines = [];
    this.reps = [];
    this.buildForm();
//    this.location.back();
  }

  createError(error){
    this.busy = false;
    this.error = true;
    if (error.status == 401) {
      this.appService.pushData({type:"SHOW-LOGIN"});
    } else if (error.status == 403) {
      this.appService.showMessage("You are not authorized to create contact.");
    } else {
      console.log(error);
      this.appService.showMessage("Contact create error.");
    }
  }

  onCancel(){
    this.location.back();
  }

  onMultiselectChange() {
    this.disciplines = this.contactsForm.value.codDisciplineID.map((discipline)=>{
        let disp = this.appService.arrayFind(this.appService.disciplines,[{name:'dispCode',value:discipline}]);
        return {
          codDisciplineID: discipline,
          name: disp? disp.dispName: ''
        }
      }
    );
  }

  onAffiliateSelect(selectedValue, row) {
    if (this.appService.arrayFind(this.affiliates, [{name:'cafAffialiateID', value:selectedValue}])){
      this.appService.showMessage("Affiliate already selected");
    } else {
      row.cafStatus = '3';
      row.cafAffialiateID = selectedValue;
      this.updateRepAffiliate();
    }
  }

  addAffiliaterow() {
    this.affiliates = this.affiliates.slice();
    this.affiliates.push({});
  }

  removeAffiliaterow(row) {
    let index = this.affiliates.indexOf(row);
    this.affiliates.splice(index, 1);
    this.affiliates = this.affiliates.slice();
    this.updateRepAffiliate();
  }

  addRepsrow() {
    this.reps = this.reps.slice();
    this.reps.push({})
  }

  removeRepsrow(row) {
    let index = this.reps.indexOf(row)
    this.reps.splice(index, 1);
    this.reps = this.reps.slice();
  }

  updateRepAffiliate(){
    this.repAffiliateOpts = this.affiliates.map((data) => {
      return this.appService.arrayFind(this.appService.affiliateOpts, [{name:'value', value:data.cafAffialiateID}]);
    });
    this.repAffiliateOpts.unshift({label:'', value:''});

    // remove reps of the deleted/removed affiliates
    this.reps = this.reps.filter((rep)=>{
      if (this.appService.arrayFind(this.affiliates, [{name:'cafAffialiateID', value:rep.corAffialiateID}])){
        return true;
      } else {
        return false;
      }
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
      codDisciplineID: [[]]
    });
  }

}
