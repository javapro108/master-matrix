import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BaseComponent } from  '../../common/base.component';

import { AppService } from '../../services/app.service';
import { CompanyService } from '../../services/company.service';
import { CompanyEntity, TblCompany, TblCompanyComment } from '../../services/company.types';

@Component({
  selector: 'create-company-view',
  templateUrl: './create.component.html'
})
export class CreateComponent extends BaseComponent implements OnInit, OnDestroy {

  busy: Boolean = false;
  companyForm: FormGroup;
  duplicateCompanies: any;
  showDuplicate: boolean;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private companyService: CompanyService
  ) {
    super();
    debugger;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(){

  }

  addCompany() {
    this.buildForm();
  }

  onBlurName() {
    if (this.companyForm.value.comName){
      this.companyService.newCheck(this.companyForm.value.comName)
          .subscribe((data) => this.newCheckResults(data))
    }
  }

  newCheckResults(duplicateCompanies) {
    this.duplicateCompanies = duplicateCompanies;
    if (this.duplicateCompanies.length > 0){
      this.showDuplicate = true;
    }
  }

  copyMainToMail(checked: boolean) {
    if (checked) {
      let formValue = this.companyForm.value;

      formValue.comMailAddress1 = formValue.comAddress;
      formValue.comMailAddress2 = formValue.comAddress2
      formValue.comMailCity = formValue.comCity;
      formValue.comMailState = formValue.comState;
      formValue.comMailZip = formValue.comZip;
      formValue.comMailCountry = formValue.comCountry;

      this.companyForm.setValue(formValue);
    }

  }

  copyMainToDelv(checked: boolean) {
    if (checked) {
      let formValue = this.companyForm.value;

      formValue.comDeliveryAddress1 = formValue.comAddress;
      formValue.comDeliveryAddress2 = formValue.comAddress2
      formValue.comDeliveryCity = formValue.comCity;
      formValue.comDeliveryState = formValue.comState;
      formValue.comDeliveryZip = formValue.comZip;
      formValue.comDeliveryCountry = formValue.comCountry;

      this.companyForm.setValue(formValue);
    }
  }

  onSubmit() {
    this.busy = true;
    let company: TblCompany = {};
    let comment: TblCompanyComment = {};
    let companyEntity: CompanyEntity = {};
    company = this.companyForm.value;
    company.comInactive = false;
    comment = {
      cmcComment: this.companyForm.value.cmcComment,
      cmcPriority: this.companyForm.value.cmcPriority
    };
    companyEntity.company = company;
    companyEntity.comments = [comment];

    this.companyService.createCompany(companyEntity)
      .subscribe((data) => this.createSuccess(data), (error) => this.createError(error));
    this.companyForm.markAsPristine();
    console.log(this.companyForm.value);
  }

  createSuccess(companyEntity) {
    this.companyService.companyEntity.company = companyEntity.company;
    this.appService.showMessage("Company " + this.companyService.companyEntity.company.comID + " created successfully", "Success");
    this.router.navigate(['../../contacts/create'], { relativeTo: this.activeRoute });
    this.busy = false;
  }

  createError(error) {
    console.log(error);
    this.busy = false;
    if (error.status = 401){
      this.appService.pushData({type:"SHOW-LOGIN"});
    } else {
      this.appService.showMessage("Error while creating company, please try again.");
    }
  }


  buildForm(): void {
    this.companyForm = this.formBuilder.group({
      comName: ['', Validators.required],
      comAlias: '',
      comPhone: ['', Validators.required],
      comFax: '',
      comTollFree: '',
      comDistrict: ['', Validators.required],
      comWeb: '',
      comAddress: ['', Validators.required],
      comAddress2: '',
      comCity: ['', Validators.required],
      comState: ['', Validators.required],
      comZip: ['', Validators.required],
      comCountry: ['USA', Validators.required],
      comDirections: '',
      comMailAddress1: ['', Validators.required],
      comMailAddress2: '',
      comMailCity: ['', Validators.required],
      comMailState: ['', Validators.required],
      comMailZip: ['', Validators.required],
      comMailCountry: ['USA', Validators.required],
      comDeliveryAddress1: '',
      comDeliveryAddress2: '',
      comDeliveryCity: '',
      comDeliveryState: '',
      comDeliveryZip: '',
      comDeliveryCountry: 'USA',
      comDeliveryDirections: '',
      comDirectionComments: '',
      cmcComment: '',
      cmcPriority: false
    });
  }

}
