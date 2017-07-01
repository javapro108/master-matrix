import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';

import { AppService } from './app.service';
import { CompanyEntity, TblCompany, TblCompanyComment, FindParams, FindCompanyResult,
         CompanyDetail } from './company.types';

@Injectable()
export class CompanyService {
  companyEntity: CompanyEntity;
  companyDetail: CompanyDetail;
  rxService: BehaviorSubject<any>;

  constructor (
    private http: Http,
    private appService: AppService
  ) {
    console.log('Company Service Initialized');
    this.rxService = new BehaviorSubject({});
    this.companyEntity = {
      findParams: { comName:'' },
      company: {}
    };
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

  subscribe(next, error?, complete?){
    return this.rxService.subscribe(next, error, complete);
  }

  pushData(data) {
    this.rxService.next(data);
  }

  getCompany(comID, lock?:boolean){
    let url:string;
    if (lock == true){
      url = 'company/get('+ comID + ')?lock=' + lock;
    } else {
      url = 'company/get('+ comID + ')';
    }
    return this.appService.httpGet(url)
  }

  findCompany(companyEntity:any){
    return this.appService.httpPost('company/findcompany', companyEntity);
  }

  getCompanyDetails(params:any){
    return this.appService.httpPost('company/details', params);
  }

  newCheck(comName){
    let data = {
      comName: comName + '%',
      theName: 'The ' + comName + '%'
    }
    return this.appService.httpPost('company/newcheck',data);
  }

  createCompany(companyEntity:any){
    return this.appService.httpPost('company/create', companyEntity);
  }

  changeCompany(companyEntity:any){
    return this.appService.httpPut('company/change', companyEntity);
  }

}
