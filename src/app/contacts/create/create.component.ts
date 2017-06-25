import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SelectItem } from 'primeng/primeng';

import { AppService } from  '../../services/app.service';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'create-contact-view',
  templateUrl: './create.component.html'
})
export class CreateComponent {

  busy: boolean = false;
  contactsForm: FormGroup;
  dispCompSearchPopup: boolean = false;

  affiliates = [];
  disciplines = [];
  reps = [];

  disciplineOpts: SelectItem[];
  productStatusOpts: SelectItem[];
  repStatusOpts: SelectItem[];
  repAffiliateOpts: SelectItem[];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private contactsService: ContactsService
  ) {
    debugger;
    this.productStatusOpts = [];
    this.productStatusOpts.push({ label: 'Likes the Product', value: 'Likes the Product' });
    this.productStatusOpts.push({ label: 'Ok with the Product', value: 'Ok with the Product' });
    this.productStatusOpts.push({ label: 'Needs to be educated about the product', value: 'Needs to be educated about the product' });

    this.repStatusOpts = [];
    this.repStatusOpts.push({ label: 'Excellent', value: 'X' });
    this.repStatusOpts.push({ label: 'Good', value: 'Y' });
    this.repStatusOpts.push({ label: 'Improving', value: 'Z' });

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

  onSubmit() {
    //debugger;
    this.contactsForm.markAsPristine();
    console.log(this.contactsForm.value);
  }


  searchCompany(){
    debugger;
    this.dispCompSearchPopup = true;
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
      conCompanyID: ['', Validators.required],
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
