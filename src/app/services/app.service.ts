import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';

import { User, DropDownOption } from './app.types';

@Injectable()
export class AppService {

  rxService: BehaviorSubject<any>;
  user:User;
  displaySideNav: string = 'show';

  districts: DropDownOption[];
  states: DropDownOption[];
  countries: DropDownOption[];


  constructor (
    private http: Http )
  {
    this.rxService = new BehaviorSubject({});
    this.user = { firstName: '' };
    this.displaySideNav = 'show';
    this.states = [];
    this.countries = [];
    this.districts = [];
  }

  subscribe(observer){
    return this.rxService.subscribe(observer);
  }

  pushData(data) {
    this.rxService.next(data);
  }

  toggleSideNav(){
    if (this.displaySideNav == 'show') {
      this.displaySideNav = 'hide';
    } else {
      this.displaySideNav = 'show';
    }
  }

  login(uName:String, pass:String){
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });

      return this.http.post(
        'http://localhost:8080/restjpa/api/login',
        { uNamePass : btoa(uName + ':' + pass) },
        options
      ).map(response => response.json());
  }

  initApp(){
    this.getStates().subscribe((states)=> this.setStates(states), (error)=> console.log(error));
    this.getCountries().subscribe((countries)=> this.setCountries(countries), (error)=> console.log(error));
    this.getDistricts().subscribe((districts)=> this.setDistricts(districts), (error)=> console.log(error))
  }

  getStates(){
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', window.localStorage.getItem("Auth-token"));
      let options = new RequestOptions({ headers: headers });
      return this.http.get(
        'http://localhost:8080/restjpa/api/app/states',
        options
      ).map(response => response.json());
  }

  getCountries(){
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', window.localStorage.getItem("Auth-token"));
      let options = new RequestOptions({ headers: headers });
      return this.http.get(
        'http://localhost:8080/restjpa/api/app/countries',
        options
      ).map(response => response.json());
  }

  getDistricts(){
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', window.localStorage.getItem("Auth-token"));
      let options = new RequestOptions({ headers: headers });
      return this.http.get(
        'http://localhost:8080/restjpa/api/employee/getdistricts',
        options
      ).map(response => response.json());
  }

  setStates(states){
    this.states.push({
      value: '',
      label: ''
    });
    states.forEach((state)=>{
      if (state.staAbbrev != '' && state.staState != '' && state.staAbbrev != undefined && state.staState != undefined ){
        this.states.push({
          value: state.staAbbrev,
          label: state.staState
        });        
      }
    });
  }

  setCountries(countries){
    this.countries.push({
      value: '',
      label: ''
    });
    countries.forEach((country)=>{
      this.countries.push({
        value: country.couID,
        label: country.couCountry
      });
    });
  }

  setDistricts(districts){
    this.districts.push({
      value: '',
      label: ''
    });
    districts.forEach((district)=>{
      this.districts.push({
        value: district.emdDisID,
        label: district.disDescription
      });
    });
  }

}
