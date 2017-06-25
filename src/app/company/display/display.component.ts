import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription'

import { AppService } from '../../services/app.service';
import { CompanyService } from '../../services/company.service';
import { CompanyEntity, TblCompany, SpCompanyTableResult, CompanyDetail } from '../../services/company.types';

@Component({
  selector: 'display-company-view',
  templateUrl: './display.component.html'
})
export class DisplayComponent implements OnInit, OnDestroy{

  busy:boolean = true;
  companyForm: FormGroup;
  subscription: Subscription;
  subRoute: Subscription;
  spCompanyTable: SpCompanyTableResult;
  companyDetail: CompanyDetail;


  constructor(
    private router: Router,
    private activeRoute:ActivatedRoute,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private companyService:CompanyService
  ){
    this.companyDetail = {
      company: {},
      comments: [],
      contacts: [],
      contactActivities: [],
      marketings: [],
      jobs: [],
      projects: []
    };
  }

  ngOnInit() {
    this.subscription = this.companyService.subscribe((data)=>this.rxUpdate(data));
    this.busy = true;
    this.buildForm();
    this.subRoute = this.activeRoute.params.subscribe( (params) => {
      debugger;
      let getParams = {
        comID: params.id,
        getCompanyDetail: true,
        getComments: true,
        getContacts: true,
        getJobs: true,
        getProjects: true,
        getMarketing: true
      }
      this.companyService.getCompanyDetails(getParams)
          .subscribe((data) => this.companyReceived(data));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subRoute.unsubscribe();
  }

  rxUpdate(data){
    debugger;
    if (data.type == 'DISPLAY-FROM-SEARCH'){
      let params = {
        comID: data.data,
        getCompanyDetail: true,
        getComments: true,
        getContacts: true,
        getJobs: true,
        getProjects: true,
        getMarketing: true
      }
      this.companyService.getCompanyDetails(params)
          .subscribe(data => this.companyReceived(data) );
      this.busy = true;
    }
  }

  companyReceived(companyDetail){
    debugger;
    this.companyDetail = companyDetail;
    this.setCompanyFormValue(this.companyDetail.company);
    this.busy = false;
  }

  changeCompany(company) {
    this.router.navigate(['../../change', this.companyDetail.company.comID], { relativeTo: this.activeRoute });
  }

  buildForm(): void{
    this.companyForm = this.formBuilder.group({
      comID:'',
      comName : ['', Validators.required],
      comInactive:'',
      comAlias :'',
      comAddress :['', Validators.required],
      comAddress2 :'',
      comCity :['', Validators.required],
      comState :['', Validators.required],
      comZip :['', Validators.required],
      comCountry :['', Validators.required],
      comWeb:'',
      comPhone: ['', Validators.required],
      comFax :'',
      comTollFree :'',
      comDirections :'',
      comDistrict: ['', Validators.required],
      comDeliveryAddress1 :['', Validators.required],
      comDeliveryAddress2 :'',
      comDeliveryCity :['', Validators.required],
      comDeliveryState :['', Validators.required],
      comDeliveryZip :['', Validators.required],
      comDeliveryCountry :['', Validators.required],
      comDeliveryDirections :'',
      comMailAddress1 :['', Validators.required],
      comMailAddress2 :'',
      comMailCity :['', Validators.required],
      comMailState :['', Validators.required],
      comMailZip :['', Validators.required],
      comMailCountry :['', Validators.required],
      comDirectionComments :'',
      comRevisedDate :'',
    	comRevisedBy :'',
    	terName :'',
    	comDate :'',
    	comCreatedBy :''

    });
  }

  setCompanyFormValue(spCompanyTable:SpCompanyTableResult){
    let companyFormValue = {
      comID:'',
      comName : '',
      comInactive:'',
      comAlias :'',
      comAddress :'',
      comAddress2 :'',
      comCity :'',
      comState :'',
      comZip :'',
      comCountry :'',
      comWeb:'',
      comPhone: '',
      comFax :'',
      comTollFree :'',
      comDirections :'',
      comDistrict: '',
      comDeliveryAddress1 :'',
      comDeliveryAddress2 :'',
      comDeliveryCity :'',
      comDeliveryState :'',
      comDeliveryZip :'',
      comDeliveryCountry :'',
      comDeliveryDirections :'',
      comMailAddress1 :'',
      comMailAddress2 :'',
      comMailCity :'',
      comMailState :'',
      comMailZip :'',
      comMailCountry :'',
      comDirectionComments :'',
      comRevisedDate :'',
    	comRevisedBy :'',
    	terName :'',
    	comDate :'',
    	comCreatedBy :''
    };

    Object.keys(companyFormValue).forEach(function(key) {
      if (spCompanyTable[key] != undefined ){
        companyFormValue[key] = spCompanyTable[key];
      }
    });

    this.companyForm.setValue(companyFormValue);

  }

}
