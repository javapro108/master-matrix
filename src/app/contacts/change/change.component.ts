import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
import { TblContacts, ContactEntity } from '../../services/contacts.types';
@Component({
  selector: 'change-contact-view',
  templateUrl: './change.component.html'
})
export class ChangeComponent extends BaseComponent implements OnInit, OnDestroy {

  busy: boolean = false;
  error: boolean = false;
  contactsForm: FormGroup;
  rxSub: Subscription;
  contactEntity: ContactEntity;
  conID:string;
  conActive: boolean;

  @ViewChild(CompanySearchComponent) companySearchComp: CompanySearchComponent;

  affiliates = [];
  disciplines = [];
  reps = [];

  states: SelectItem[] = [];
  countries: SelectItem[] = [];
  repOpts: SelectItem[] = [];
  repOptsAll: SelectItem[] = [];
  prefixOpts: SelectItem[] = [];
  disciplineOpts: SelectItem[] = [];
  disciplineOptsAll: SelectItem[] = [];
  positionOpts: SelectItem[] = [];
  affiliateOpts: SelectItem[] = [];
  affiliateOptsAll: SelectItem[] = [];
  affStatusOpts: SelectItem[] = [];
  productStatusOpts: SelectItem[];
  repStatusOpts: SelectItem[];
  repAffiliateOpts: SelectItem[];

  constructor(
    private router: Router,
    private location: Location,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private contactsService: ContactsService,
    private companyService: CompanyService
  ) {
    super();
    this.contactEntity = {
      contact: {
        conCourtesy: "",
        conFName: "",
        conLName: "",
      }
    };

    this.states = appService.states ;
    this.countries = appService.countries ;
    this.repOptsAll = appService.repOptsAll ;
    this.repOpts = appService.repOpts ;
    this.prefixOpts = appService.prefixOpts ;
    this.disciplineOpts = appService.disciplineOpts ;
    this.disciplineOptsAll = appService.disciplineOptsAll ;
    this.positionOpts = appService.positionOpts ;
    this.affiliateOpts = appService.affiliateOpts ;
    this.affiliateOptsAll = appService.affiliateOptsAll ;
    this.affStatusOpts = appService.affStatusOpts ;
    this.productStatusOpts = appService.productStatusOpts ;
    this.repStatusOpts = appService.repStatusOpts ;

  }

  ngOnInit(): void {
    this.busy = true;
    this.rxSub = this.contactsService.subscribe((data) => this.rxUpdate(data));
    this.buildForm();
    this.activeRoute.params.subscribe((params) => {
      this.contactsService.getContact(params.id, true)
        .subscribe((data) => this.getSuccess(data), (error) => this.getError(error))
    });
  }

  ngOnDestroy() {
    this.rxSub.unsubscribe();
  }

  rxUpdate(data) {

  }

  getSuccess(contactEntity) {
    this.busy = false;
    if (contactEntity.messages.length > 0){
      this.appService.showMessage(contactEntity.messages[0].message);
      this.location.back();
    } else {
      this.initValues(contactEntity);
    }
  }

  getError(error) {
    this.busy = true;
    this.error = true;
    if (error.status == 401) {
      this.location.back();
      this.appService.pushData({type:"SHOW-LOGIN"});
    } else {
      this.appService.showMessage("Error reading contact data.");
    }
  }

  initValues(contactEntity){
    debugger;
    this.contactEntity = contactEntity;

    this.conID = this.contactEntity.contact.conID;
    this.conActive = !this.contactEntity.contact.conInactive;

    let formValue:ContactEntity = Object.assign({}, contactEntity);
    //Deep copy arrays so that can be compared while submit
    this.affiliates = contactEntity.affiliates.map((data) => Object.assign({},data));
    this.reps = contactEntity.reps.map((data) => Object.assign({},data));
    this.updateRepAffiliate();
    if (!this.contactEntity.disciplines) {
      this.contactEntity.disciplines = [];
    }
    formValue.disciplines = formValue.disciplines.map(discipline => discipline.codDisciplineID);
    if (contactEntity.contact.conBirthday != undefined && contactEntity.contact.conBirthday != ""){
      formValue.contact.conBirthday = new Date(Date.parse(contactEntity.contact.conBirthday));
    }
    if (contactEntity.contact.conAnniversary != undefined && contactEntity.contact.conAnniversary != ""){
      formValue.contact.conAnniversary = new Date(Date.parse(contactEntity.contact.conAnniversary));
    }
    this.setFormValue(formValue);
    //Call multiselect change event handler to populate discipline table
    this.onMultiselectChange();
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
    this.reps.push({});
  }

  removeRepsrow(row) {
    let index = this.reps.indexOf(row)
    this.reps.splice(index, 1);
    this.reps = this.reps.slice();
  }

  updateRepAffiliate() {
    this.repAffiliateOpts = this.affiliates.map((affiliate) => {
      return this.appService.arrayFind(this.appService.affiliateOpts, [{ name: 'value', value: affiliate.cafAffialiateID }]);
    }).filter((affiliateOpt) => {
      // we need this filter in change mode, because old contact can have inactive affilirated wich are not part of the
      // affiliateOpts in this case affiliateOpt will be undefined. filer such options
      if (affiliateOpt) {
        return (affiliateOpt.value ? true : false);
      } else {
        return false;
      }
    });
    this.repAffiliateOpts.unshift({ label: '', value: '' });

    // remove reps of the deleted/removed affiliates
    this.reps = this.reps.filter((rep)=>{
      if (this.appService.arrayFind(this.affiliates, [{name:'cafAffialiateID', value:rep.corAffialiateID}])){
        return true;
      } else {
        return false;
      }
    });

  }

  onBlurName(){

  }

  onSubmit() {
    this.contactsForm.markAsPristine();
    let disciplinesSend: any[] = [];
    let affiliatesSend: any[] = [];
    let repsSend: any[] = [];
    let dispOk: boolean = false;
    let affOk: boolean = false;
    let repOk: boolean = false;

    //Find disciplines deleted
    this.contactEntity.disciplines.forEach((discipline) => {
      let newDiscipline = this.appService.arrayFind(this.disciplines, [{ name: 'codDisciplineID', value: discipline.codDisciplineID }]);
      if (!newDiscipline) {
        discipline.mode = "D";
        discipline.codContactID = this.conID;
        disciplinesSend.push(discipline);
      }
    });

    //Find disciplines updated and inserted
    this.disciplines.forEach((discipline) => {
      let oldDiscipline = "";
      oldDiscipline = this.appService.arrayFind(this.contactEntity.disciplines, [{ name: 'codDisciplineID', value: discipline.codDisciplineID }]);
      if (oldDiscipline) {
        dispOk = true;
        discipline.mode = "U";
        discipline.codContactID = this.conID;
        disciplinesSend.push(discipline);
      }
      else if (discipline.codDisciplineID) {
        dispOk = true;
        discipline.mode = "I";
        discipline.codContactID = this.conID;
        disciplinesSend.push(discipline);
      }
    });

    //Find affiliates deleted
    //Loop through ols affiliates and find new affiliate array
    this.contactEntity.affiliates.forEach((affiliate) => {
      let newAffiliate = this.appService.arrayFind(this.affiliates, [{ name: 'cafAffialiateID', value: affiliate.cafAffialiateID }]);
      if (!newAffiliate) {
        affiliate.mode = "D";
        affiliate.cafContactID = this.conID;
        affiliatesSend.push(affiliate);
      }
    });

    //Loop through new affiliates and look for in old affiliates
    this.affiliates.forEach((affiliate) => {
      let oldAffiliate = this.appService.arrayFind(this.contactEntity.affiliates, [{ name: 'cafAffialiateID', value: affiliate.cafAffialiateID }]);
      if (oldAffiliate) {
        affOk = true;
        affiliate.mode = "U";
        affiliate.cafContactID = this.conID;
        affiliatesSend.push(affiliate);
      } else if (affiliate.cafAffialiateID) {
        affOk = true;
        affiliate.mode = "I";
        affiliate.cafContactID = this.conID;
        affiliatesSend.push(affiliate);
      }
    });

    //Find reps deleted
    //Loop through old reps and find new reps array
    this.contactEntity.reps.forEach((rep) => {
      let newRep = this.appService.arrayFind(this.reps,
        [{ name: 'corRepID', value: rep.corRepID },
         { name: 'corAffialiateID', value: rep.corAffialiateID }]);
      if (!newRep) {
        rep.mode = "D";
        rep.corContactID = this.conID;
        repsSend.push(rep);
      }
    });

    //Loop through new affiliates and look for in old affiliates
    this.reps.forEach((rep) => {
      let oldRep = this.appService.arrayFind(this.contactEntity.reps,
        [{ name: 'corRepID', value: rep.corRepID },
         { name: 'corAffialiateID', value: rep.corAffialiateID }]);
      if (oldRep) {
        repOk = true;
        rep.mode = "U";
        rep.corContactID = this.conID;
        repsSend.push(rep);
      } else if (rep.corRepID && rep.corAffialiateID){
        repOk = true;
        rep.mode = "I";
        rep.corContactID = this.conID;
        repsSend.push(rep);
      }
    });

    if(!dispOk){
      this.appService.showMessage("Please enter disciplines");
      return;
    }

    if(!affOk){
      this.appService.showMessage("Please enter affiliates");
      return;
    }

    if(!repOk){
      this.appService.showMessage("Please enter reps");
      return;
    }

    let contactEntity = {
      contact: this.contactsForm.value,
      disciplines: disciplinesSend,
      affiliates: affiliatesSend,
      reps: repsSend
    };

    contactEntity.contact.conDate = this.contactEntity.contact.conDate;
    contactEntity.contact.conCreatedBy = this.contactEntity.contact.conCreatedBy;

    if (this.conActive == true || this.conActive == false ){
      contactEntity.contact.conInactive = !this.conActive;
    }

    this.busy = true;
    this.contactsService.changeContact(contactEntity)
        .subscribe((data)=>this.changeSuccess(data), (error)=>this.changeError(error));

  }

  changeSuccess(contactEntity) {
    console.log(contactEntity);
    this.conID = contactEntity.contact.conID;
    this.busy = false;
    this.appService.showMessage("Contact " + this.conID + " changed successfully.", "Success");
    this.location.back();
  }

  changeError(error) {
    this.error = true;
    this.busy = false;
    if (error.status == 401) {
      this.appService.pushData({type:"SHOW-LOGIN"});
    } else if (error.status == 403) {
      this.appService.showMessage("You are not authorized to change contact.");
    } else {
      this.appService.showMessage("Contact " + this.conID + " change error.");
      console.log(error);
    }
  }

  onCancel(){
    this.location.back();
  }

  buildForm(): void {
    this.contactsForm = this.formBuilder.group({
      conID: '',
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

  setFormValue(contactEntity: ContactEntity) {
    let contactFormValue = {
      conID: contactEntity.contact.conID,
      conCourtesy: contactEntity.contact.conCourtesy,
      conFName: contactEntity.contact.conFName,
      conMI: contactEntity.contact.conMI,
      conLName: contactEntity.contact.conLName,
      conAlias: contactEntity.contact.conAlias,
      conCompanyID: contactEntity.contact.conCompanyID,
      conTitle: contactEntity.contact.conTitle,
      conPosition: contactEntity.contact.conPosition,
      conDirectPhone: contactEntity.contact.conDirectPhone,
      conExt: contactEntity.contact.conExt,
      conCellPhone: contactEntity.contact.conCellPhone,
      conFaxNum: contactEntity.contact.conFaxNum,
      conEmail: contactEntity.contact.conEmail,
      conAssistantName: contactEntity.contact.conAssistantName,
      conAssistPhone: contactEntity.contact.conAssistPhone,
      conAssistExt: contactEntity.contact.conAssistExt,
      conAssistEmail: contactEntity.contact.conAssistEmail,
      conHomeAddress: contactEntity.contact.conHomeAddress,
      conHomeAddress2: contactEntity.contact.conHomeAddress2,
      conHomeCity: contactEntity.contact.conHomeCity,
      conHomeState: contactEntity.contact.conHomeState,
      conHomeZip: contactEntity.contact.conHomeZip,
      conHomePhone: contactEntity.contact.conHomePhone,
      conHomeFax: contactEntity.contact.conHomeFax,
      conHomeEmail: contactEntity.contact.conHomeEmail,
      conBirthday: contactEntity.contact.conBirthday,
      conAnniversary: contactEntity.contact.conAnniversary,
      conGuestName: contactEntity.contact.conGuestName,
      codDisciplineID: contactEntity.disciplines
    }

    Object.keys(contactFormValue).forEach(function(key) {
      if (contactFormValue[key] == undefined) {
        contactFormValue[key] = '';
      }
    });
    this.contactsForm.setValue(contactFormValue);
  }

  canDeactivateRoute(){
    this.appService.unLockObject("CONTACT", this.conID).subscribe((data)=>{}, (error)=>console.log(error));
    return true;
  }


}
