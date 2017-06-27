import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';

import { SelectItem } from 'primeng/primeng';

import { AppService } from './app.service';

import { ContactEntity } from './contacts.types';

@Injectable()
export class ContactsService {

  contactEntity: ContactEntity;
  rxService: BehaviorSubject<any>;

  constructor (
    private http: Http,
    private appService: AppService
  ){
    this.contactEntity = {
      findParams: {
        conName: '',
        conInactive: false,
        conActive: true
      }
    };

    this.rxService = new BehaviorSubject({});

  }

  subscribe(next, error?, complete?){
    return this.rxService.subscribe(next, error, complete);
  }

  pushData(data) {
    this.rxService.next(data);
  }

  getContact(conID){
    return this.appService.httpGet('contacts/get('+ conID + ')');
  }


  createContact(contactEntity:ContactEntity){
    return this.appService.httpPost('contacts/create',contactEntity);
  }


  findContactsAdvAll(contactEntity:any){
    return this.appService.httpPost('contacts/findcontactadvall', contactEntity);
    /*
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', window.localStorage.getItem("Auth-token"));
      let options = new RequestOptions({ headers: headers });
      return this.http.post(
        'http://localhost:8080/restjpa/api/contacts/findcontactadvall',
        contactEntity,
        options
      ).map(response => response.json());
    */
  }

  findContactsAdv(contactEntity:any){
    return this.appService.httpPost('contacts/findcontactadv', contactEntity);
    /*
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', window.localStorage.getItem("Auth-token"));
      let options = new RequestOptions({ headers: headers });
      return this.http.post(
        'http://localhost:8080/restjpa/api/contacts/findcontactadv',
        contactEntity,
        options
      ).map(response => response.json());
    */
  }
}
