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
  displayDialog:boolean = false;
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
          .subscribe((data) => this.getCompanySuccess(data), (error) => this.getCompanyError(error));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subRoute.unsubscribe();
  }

  rxUpdate(data){
  }

  getCompanySuccess(companyDetail){
    this.companyDetail = companyDetail;
    this.setCompanyFormValue(this.companyDetail.company);
    this.busy = false;
  }
  getCompanyError(error){
    if (error.status = 401){
      this.appService.pushData({type:"SHOW-LOGIN"});
    } else {
      // Show error
    }
  }

  changeCompany(company) {
    this.router.navigate(['../../change', this.companyDetail.company.comID], { relativeTo: this.activeRoute });
  }

  saveComments(cmcPriority,cmcComment){
    debugger;
    this.displayDialog = false;
    let comment = {
      cmcCompanyID: this.companyDetail.company.comID,
      cmcPriority: cmcPriority,
      cmcComment: cmcComment
    }
    this.companyService.addComment(comment)
        .subscribe(data => this.successAddComment(data), error => this.errorAddComment(error));
  }

  successAddComment(comment){
    comment.cmcPriority = comment.cmcPriority == true? '!':'';
    this.companyDetail.comments.unshift(comment);
    this.companyDetail.comments = this.companyDetail.comments.slice();
  }

  errorAddComment(error){

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
