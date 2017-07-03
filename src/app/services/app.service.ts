import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';

import {SelectItem} from 'primeng/primeng';

import { User, AppMessage, NameValue } from './app.types';

@Injectable()
export class AppService {

  serverUrl = 'http://localhost:8080/restjpa/api/';

  rxService: BehaviorSubject<any>;
  user: User = {};
  latestMessage: AppMessage = {};
  appMessages: AppMessage[] = [];

  displaySideNav: string = 'show';

  reps = [];
  affiliates = [];
  disciplines = [];

  districts: SelectItem[] = [];
  states: SelectItem[] = [];
  countries: SelectItem[] = [];
  repOpts: SelectItem[] = [];
  prefixOpts: SelectItem[] = [];
  disciplineOpts: SelectItem[] = [];
  positionOpts: SelectItem[] = [];
  affiliateOpts: SelectItem[] = [];
  affStatusOpts: SelectItem[] = [];
  productStatusOpts: SelectItem[];
  repStatusOpts: SelectItem[];



  constructor(
    private http: Http,
    @Inject(DOCUMENT) private document: any
  ) {
    this.rxService = new BehaviorSubject({});
    this.user = { firstName: 'Guest' };
    this.displaySideNav = 'show';

    this.productStatusOpts = [];
    this.productStatusOpts.push({ label: '', value: '' });
    this.productStatusOpts.push({ label: 'Likes the Product', value: 'A' });
    this.productStatusOpts.push({ label: 'Ok with the Product', value: 'B' });
    this.productStatusOpts.push({ label: 'Needs to be educated about the product', value: 'C' });

    this.repStatusOpts = [];
    this.repStatusOpts.push({ label: '', value: '' });
    this.repStatusOpts.push({ label: 'Excellent', value: 'X' });
    this.repStatusOpts.push({ label: 'Good', value: 'Y' });
    this.repStatusOpts.push({ label: 'Improving', value: 'Z' });
  }

  subscribe(success: any, error?: any, complete?: any) {
    return this.rxService.subscribe(success, error, complete);
  }

  pushData(data) {
    this.rxService.next(data);
  }

  getDocument(){
    return this.document;
  }

  toggleSideNav() {
    if (this.displaySideNav == 'show') {
      this.displaySideNav = 'hide';
    } else {
      this.displaySideNav = 'show';
    }
  }

  login(uName: String, pass: String) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(
      'http://localhost:8080/restjpa/api/login',
      { uNamePass: btoa(uName + ':' + pass) },
      options
    ).map(response => response.json());
  }

  setLoginUser(data) {
    window.localStorage.setItem("current-user", btoa(JSON.stringify(data)));
    this.initApp();
  }


  initApp() {
    debugger;
    try {
      this.user = JSON.parse(atob(window.localStorage.getItem("current-user")));
      this.httpGet('app/states')
        .subscribe((states) => this.setStates(states), (error) => this.serverError(error));
      this.httpGet('app/countries')
        .subscribe((countries) => this.setCountries(countries), (error) => console.log(error));
      this.httpGet('employee/getdistricts')
        .subscribe((districts) => this.setDistricts(districts), (error) => console.log(error));
      this.httpGet('app/prefixes')
        .subscribe((prefixes) => this.setPrefixes(prefixes), (error) => console.log(error));
      this.httpGet('app/affiliatedropdown')
        .subscribe((affiliates) => this.setAffiliateOpts(affiliates), (error) => console.log(error));
      this.httpGet('app/positiondropdown')
        .subscribe((positions) => this.setPositions(positions), (error) => console.log(error));
      this.httpGet('app/disciplinedropdown')
        .subscribe((disciplines) => this.setDisciplines(disciplines), (error) => console.log(error));
      this.httpGet('app/repdropdown')
        .subscribe((reps) => this.setRepOpts(reps), (error) => console.log(error));
      this.httpGet('app/affstatus')
        .subscribe((affStats) => this.setAffStatus(affStats), (error) => console.log(error));
      this.httpGet('app/reps')
        .subscribe((reps) => { this.reps = reps; }, (error) => console.log(error));
      this.httpGet('app/affiliates')
        .subscribe((affs) => { this.affiliates = affs; }, (error) => console.log(error));
    } catch (error) {
      this.pushData({ type: "SHOW-LOGIN" });
    }
  }

  serverError(error) {
    if (error.status == 401) {
      this.pushData({ type: "SHOW-LOGIN" });
    } else {
      console.log(error);
    }
  }

  httpGet(url: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.user.token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.serverUrl + url, options)
      .map(response => response.json());
  }


  httpPost(url: string, data: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.user.token);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.serverUrl + url, data, options)
      .map(response => response.json());
  }


  httpPut(url: string, data: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.user.token);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.serverUrl + url, data, options)
      .map(response => response.json());
  }

  setStates(states) {
    this.states.push({
      value: '',
      label: ''
    });
    states.forEach((state) => {
      if (state.staAbbrev != '' && state.staState != '' && state.staAbbrev != undefined && state.staState != undefined) {
        this.states.push({
          value: state.staAbbrev,
          label: state.staState
        });
      }
    });
  }

  setCountries(countries) {
    this.countries.push({
      value: '',
      label: ''
    });
    countries.forEach((country) => {
      this.countries.push({
        value: country.couID,
        label: country.couCountry
      });
    });
  }

  setDistricts(districts) {
    this.districts.push({
      value: '',
      label: ''
    });
    districts.forEach((district) => {
      this.districts.push({
        value: district.emdDisID,
        label: district.disDescription
      });
    });
  }

  setPrefixes(prefixes) {
    this.prefixOpts.push({
      value: '',
      label: ''
    });

    prefixes.forEach((prefixes) => {
      this.prefixOpts.push({
        value: prefixes.pfxPrefix,
        label: prefixes.pfxPrefix
      });
    });
  }

  setAffiliateOpts(affiliates) {
    this.affiliateOpts.push({
      value: '',
      label: ''
    });

    affiliates.forEach((affiliate) => {
      this.affiliateOpts.push({
        value: affiliate.affID,
        label: affiliate.affName
      });
    });
  }

  setPositions(positions) {
    this.positionOpts.push({
      value: '',
      label: ''
    });

    positions.forEach((position) => {
      this.positionOpts.push({
        value: position.posID,
        label: position.posPosition
      });
    });
  }

  setDisciplines(disciplines) {
    this.disciplines = disciplines;
    this.disciplineOpts = disciplines.filter(discipline => !discipline.dispInactive).map((discipline) => {
      return {
        value: discipline.dispCode,
        label: discipline.dispCode + " - " + discipline.dispName
      };
    });
  }

  setRepOpts(reps) {
    this.repOpts.push({
      value: '',
      label: ''
    });

    reps.forEach((rep) => {
      this.repOpts.push({
        value: rep.empUserName,
        label: rep.empDescription
      });
    });
  }

  setAffStatus(affStats) {
    this.affStatusOpts.push({
      value: '',
      label: ''
    });

    affStats.forEach((affStat) => {
      this.affStatusOpts.push({
        value: affStat.staAffID,
        label: affStat.staAffDesc
      });
    });
  }


  /* UTILITY METHODS */

  showMessage(message: string, type?: string) {
    let data = {
      type: "NEW-MESSAGE",
      data: {
        type: type ? type : "Error",
        message: message
      }
    }
    this.appMessages.unshift(data.data);
    this.appMessages = this.appMessages.slice();
    this.latestMessage = data.data;
    this.pushData(data);
  }

  arrayFind(array = [], nameValue: NameValue[]) {
    return array.find(function(element) {
      let found = true;
      nameValue.forEach((nameValue: NameValue) => {
        if (element[nameValue.name] != nameValue.value) {
          found = false;
        }
      });
      return found;
    });
  }

}
