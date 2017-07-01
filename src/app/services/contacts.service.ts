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

  newCheck(conFName, conLName){
    let data = {
      conFName: conFName.charAt(0) + '%',
      conLName: conLName + '%'
    };
    return this.appService.httpPost('contacts/newcheck',data);
  }


  createContact(contactEntity:ContactEntity){
    return this.appService.httpPost('contacts/create',contactEntity);
  }

  changeContact(contactEntity:ContactEntity){
    return this.appService.httpPut('contacts/change',contactEntity);
  }

  getContactDetails(params:any){
    return this.appService.httpPost('contacts/details', params);
  }

  findContactsAdvAll(contactEntity:any){
    return this.appService.httpPost('contacts/findcontactadvall', contactEntity);
  }

  findContactsAdv(contactEntity:any){
    return this.appService.httpPost('contacts/findcontactadv', contactEntity);
  }
}
