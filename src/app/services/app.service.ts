import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';

import { SelectItem } from 'primeng/primeng';

import { User, AppMessage, NameValue, GlobalObject } from './app.types';

@Injectable()
export class AppService {

  //Stand alone server on development
  serverUrl = 'http://localhost:8080/restjpa/api/';

  //Stand alone server on tomcate 
  //serverUrl = 'http://localhost:8080/master-matrix/api/';

  //Final Deployed On Same Server - Production Mode
  //serverUrl = 'api/';

  rxService: BehaviorSubject<any>;
  globalObject: GlobalObject;
  user: User = {};
  latestMessage: AppMessage = {};
  appMessages: AppMessage[] = [];

  employees = [];
  affiliates = [];
  disciplines = [];

  empDistricts: SelectItem[] = [];
  states: SelectItem[] = [];
  countries: SelectItem[] = [];
  repOpts: SelectItem[] = [];
  repOptsAll: SelectItem[] = [];
  prefixOpts: SelectItem[] = [];
  disciplineOpts: SelectItem[] = [];
  disciplineOptsAll: SelectItem[] = [];
  positionOpts: SelectItem[] = [];
  empAffiliateOpts: SelectItem[] = [];
  affiliateOptsAll: SelectItem[] = [];
  affStatusOpts: SelectItem[] = [];
  productStatusOpts: SelectItem[];
  repStatusOpts: SelectItem[];
  monthNames = {};


  constructor(
    private http: Http,
    @Inject(DOCUMENT) private document: any
  ) {
    this.rxService = new BehaviorSubject({});
    this.user = { firstName: 'Guest' };
    this.globalObject = {};

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

    this.monthNames = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      "10": "October",
      "11": "November",
      "12": "December"
    };
  }

  subscribe(success: any, error?: any, complete?: any) {
    return this.rxService.subscribe(success, error, complete);
  }

  pushData(data) {
    debugger;
    this.rxService.next(data);
  }

  getDocument() {
    return this.document;
  }

  login(uName: String, pass: String) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(
      this.serverUrl + 'login',
      { uNamePass: btoa(uName + ':' + pass) },
      options
    ).map(response => response.json());
  }

  lockObject(objectType: string, objectId: string) {
    let lock = {
      objectType: objectType,
      objectId: objectId
    };
    return this.httpPost('app/lock', lock);
  }

  unLockObject(objectType: string, objectId: string) {
    let lock = {
      objectType: objectType,
      objectId: objectId
    };
    return this.httpPost('app/unlock', lock);
  }


  setLoginUser(data) {
    window.localStorage.setItem("current-user", btoa(JSON.stringify(data)));
    this.initApp();
  }


  initApp() {

    this.employees = [];
    this.affiliates = [];
    this.empDistricts = [];
    this.states = [];
    this.disciplines = [];
    this.countries = [];
    this.repOpts = [];
    this.repOptsAll = [];
    this.prefixOpts = [];
    this.disciplineOpts = [];
    this.disciplineOptsAll = [];
    this.positionOpts = [];
    this.empAffiliateOpts = [];
    this.affiliateOptsAll = [];
    this.affStatusOpts = [];

    try {
      let newUser = JSON.parse(atob(window.localStorage.getItem("current-user")));
      if (this.user.token != newUser.token) {
        debugger;
        this.user.firstName = newUser.firstName;
        this.user.lastName = newUser.lastName;
        this.user.department = newUser.department;
        this.user.email = newUser.email;
        this.user.token = newUser.token;
        this.user.userName = newUser.userName;

        this.httpGet('app/initapp')
          .subscribe((appData) => this.setAppData(appData), (error) => this.serverError(error));
        /*
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
                  .subscribe((reps) => this.setRepOptsAll(reps), (error) => console.log(error));
                this.httpGet('app/affiliates')
                  .subscribe((affs) => this.setAffiliateOptsAll(affs), (error) => console.log(error));
        */
      }
    } catch (error) {
      this.pushData({ type: "SHOW-LOGIN" });
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

  setAppData(appData) {
    this.setEmpDistricts(appData.empDistricts);
    this.setStates(appData.states);
    this.setCountries(appData.countries);
    this.setPrefixes(appData.prefixOpts);
    this.setRepOpts(appData.repOpts);
    this.setEmployees(appData.employees);
    this.setDisciplines(appData.dispOpts);
    this.setPositions(appData.posOpts);
    this.setEmpAffiliateOpts(appData.empAffOpts);
    this.setAffiliateOptsAll(appData.affOptsAll);
    this.setAffStatus(appData.affStatus);
  }

  serverError(error) {
    if (error.status == 401) {
      this.pushData({ type: "SHOW-LOGIN" });
    } else {
      console.log(error);
    }
  }

  setEmpDistricts(empDistricts) {
    this.empDistricts.push({
      value: '',
      label: ''
    });
    empDistricts.forEach((district) => {
      this.empDistricts.push({
        value: district.emdDisID,
        label: district.disDescription
      });
    });
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

  setEmpAffiliateOpts(affiliates) {
    this.empAffiliateOpts.push({
      value: '',
      label: ''
    });

    affiliates.forEach((affiliate) => {
      this.empAffiliateOpts.push({
        value: affiliate.affID,
        label: affiliate.affName
      });
    });
  }

  setAffiliateOptsAll(affiliates) {
    this.affiliates = affiliates;
    this.affiliateOptsAll.push({
      value: '',
      label: ''
    });
    affiliates.forEach((affiliate) => {
      if (affiliate.affID) {
        this.affiliateOptsAll.push({
          value: affiliate.affID,
          label: affiliate.affID + " - " + affiliate.affName
        });
      }
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

    this.disciplineOptsAll = disciplines.map((discipline) => {
      return {
        value: discipline.dispCode,
        label: discipline.dispCode + " - " + discipline.dispName
      };
    });

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

  setEmployees(employees) {
    this.employees = employees;
    this.repOptsAll.push({
      value: '',
      label: ''
    });

    employees.filter((employee) => employee.empRep).forEach((rep) => {
      this.repOptsAll.push({
        value: rep.empUserName,
        label: rep.empUserName + " - " + rep.empName
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
    return array.find(function (element) {
      let found = true;
      nameValue.forEach((nameValue: NameValue) => {
        if (element[nameValue.name] != nameValue.value) {
          found = false;
        }
      });
      return found;
    });
  }

  formatDate(date: string): string {
    let formattedDate: string = "";
    if (date) {
      let monthName = this.monthNames[date.substring(7, 5)];
      let year = date.substring(0, 4);
      let day = date.substring(10, 8);
      formattedDate = monthName + " " + day + ", " + year;
    }
    return formattedDate;
  }

}
