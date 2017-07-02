import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription'

import { BaseComponent } from  '../../common/base.component';

import { AppService } from '../../services/app.service';
import { CanDeactivateRoute } from '../../services/route.service';
import { CompanyService } from '../../services/company.service';
import { CompanyEntity, TblCompany, TblCompanyComment } from '../../services/company.types';

@Component({
  selector: 'change-company-view',
  templateUrl: './change.component.html'
})
export class ChangeComponent extends BaseComponent implements OnInit{

  busy:boolean = false;
  error:boolean = false;
  companyForm: FormGroup;
  subscription: Subscription;
  subRoute: Subscription;
  companyEntity: CompanyEntity;
  comActive: boolean;


  constructor(
    private router: Router,
    private location:Location,
    private activeRoute:ActivatedRoute,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private companyService:CompanyService
  ){
    super();
    debugger;
  }


  ngOnInit(): void{
   this.buildForm();
   this.subRoute = this.activeRoute.params.subscribe( (params) => {
     this.companyService.getCompany(params.id, true)
         .subscribe((data) => this.getSuccess(data), (error) => this.getError(error))
   });
   this.subscription = this.companyService.subscribe((data)=>this.rxUpdate(data));
   this.busy = true;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subRoute.unsubscribe();
  }


  rxUpdate(data){
    if (data.type == 'CHANGE-FROM-CREATE'){
      this.setCompanyFormValue(data.data);
    } else if ( data.type == 'CHANGE-FROM-SEARCH' ) {
      this.companyService.getCompany(data.data)
          .subscribe((data) => this.getSuccess(data), (error) => this.getError(error))
    }
  }


  getSuccess(companyEntity){
    console.log('get company');
    console.log(companyEntity.company);
    this.setCompanyFormValue(companyEntity.company);
    this.comActive = !companyEntity.company.comInactive;
    this.busy = false;
  }


  getError(error){
    this.error = true;
    this.busy = false;
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
    this.companyService.companyEntity.company = this.companyForm.value;
    if (this.comActive == true || this.comActive == false){
      this.companyService.companyEntity.company.comInactive = !this.comActive;
    }
    console.log(this.companyService.companyEntity);
    this.companyService.changeCompany(this.companyService.companyEntity)
        .subscribe((data) => this.changeSuccess(data),(data) => this.changeError(data) )
    this.companyForm.markAsPristine();
  }


  changeSuccess(companyEntity){
    this.companyService.companyEntity = companyEntity;
    this.setCompanyFormValue(this.companyService.companyEntity.company);
    this.busy = false;
    this.location.back();
  }


  changeError(error){
    this.busy = false;
    this.error = true;
  }


  buildForm(): void{
    this.companyForm = this.formBuilder.group({
      comID:'',
      comName : ['', Validators.required],
      comInactive:'',
      comAlias :'',
      comPhone: ['', Validators.required],
      comFax :'',
      comTollFree :'',
      comDistrict: ['', Validators.required],
      comWeb:'',
      comAddress :['', Validators.required],
      comAddress2 :'',
      comCity :['', Validators.required],
      comState :['', Validators.required],
      comZip :['', Validators.required],
      comCountry :['', Validators.required],
      comDirections :'',
      comMailAddress1 :['', Validators.required],
      comMailAddress2 :'',
      comMailCity :['', Validators.required],
      comMailState :['', Validators.required],
      comMailZip :['', Validators.required],
      comMailCountry :['', Validators.required],
      comDeliveryAddress1 :'',
      comDeliveryAddress2 :'',
      comDeliveryCity :'',
      comDeliveryState :'',
      comDeliveryZip :'',
      comDeliveryCountry :'',
      comDeliveryDirections :'',
      comDirectionComments :'',
      cmcComment :'',
      cmcPriority: ''
    });
  }

  setCompanyFormValue(company:TblCompany) {
    let companyFormValue = {
      comID: company.comID,
      comName : company.comName,
      comInactive: company.comInactive,
      comAlias : company.comAlias,
      comPhone: company.comPhone,
      comFax : company.comFax,
      comTollFree : company.comTollFree,
      comDistrict: company.comDistrict,
      comWeb: company.comWeb,
      comAddress : company.comAddress,
      comAddress2 : company.comAddress2,
      comCity : company.comCity,
      comState : company.comState,
      comZip : company.comZip,
      comCountry : company.comCountry,
      comDirections : company.comDirections,
      comMailAddress1 : company.comMailAddress1,
      comMailAddress2 : company.comMailAddress2,
      comMailCity : company.comMailCity,
      comMailState : company.comMailState,
      comMailZip : company.comMailZip,
      comMailCountry : company.comMailCountry,
      comDeliveryAddress1 : company.comDeliveryAddress1,
      comDeliveryAddress2 : company.comDeliveryAddress2,
      comDeliveryCity : company.comDeliveryCity,
      comDeliveryState : company.comDeliveryState,
      comDeliveryZip : company.comDeliveryZip,
      comDeliveryCountry : company.comDeliveryCountry,
      comDeliveryDirections : company.comDeliveryDirections,
      comDirectionComments : company.comDirectionComments,
      cmcComment: '',
      cmcPriority: false
    }

    Object.keys(companyFormValue).forEach(function(key) {
      if (companyFormValue[key] == undefined ){
        companyFormValue[key] = '';
      }
    });

    this.companyForm.setValue(companyFormValue);
  }

}
