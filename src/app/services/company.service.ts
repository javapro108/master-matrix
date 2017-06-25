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
      findParams: { comName:'' }
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

  subscribe(observer){
    return this.rxService.subscribe(observer);
  }

  pushData(data) {
    this.rxService.next(data);
  }

  getCompany(comID){

    return this.appService.httpGet('company/get('+ comID + ')')

    /*
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', window.localStorage.getItem("Auth-token"));
      let options = new RequestOptions({ headers: headers });
      return this.http.get(
        'http://localhost:8080/restjpa/api/company/get('+ comID + ')',
        options
      ).map(response => response.json());
    */
  }

  findCompany(companyEntity:any){

    return this.appService.httpPost('company/findcompany', companyEntity);
    /*
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', window.localStorage.getItem("Auth-token"));
      let options = new RequestOptions({ headers: headers });
      return this.http.post(
        'http://localhost:8080/restjpa/api/company/findcompany',
        companyEntity,
        options
      ).map(response => response.json());
    */
  }

  getCompanyDetails(params:any){
    return this.appService.httpPost('company/details', params);
    /*
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', window.localStorage.getItem("Auth-token"));
      let options = new RequestOptions({ headers: headers });
      return this.http.post(
        'http://localhost:8080/restjpa/api/company/details',
        params,
        options
      ).map(response => response.json());
    */
  }

  createCompany(companyEntity:any){
    return this.appService.httpPost('company/create', companyEntity);
    /*
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', window.localStorage.getItem("Auth-token"));
      let options = new RequestOptions({ headers: headers });
      return this.http.post(
        'http://localhost:8080/restjpa/api/company/create',
        companyEntity,
        options
      ).map(response => response.json());
    */
  }
  changeCompany(companyEntity:any){
    return this.appService.httpPut('company/change', companyEntity);
    /*
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', window.localStorage.getItem("Auth-token"));
      let options = new RequestOptions({ headers: headers });
      return this.http.post(
        'http://localhost:8080/restjpa/api/company/change',
        companyEntity,
        options
      ).map(response => response.json());
    */
  }

}
