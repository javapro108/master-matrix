import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

interface Contact {

}

interface Comment {

}

interface FindParams {
  conName?: String;
  conInactive?: Boolean;
  conActive?: Boolean;
}

interface Discipline {}

interface Affiliate {}

interface Rep {}

interface FindResult {
  conID?: String;
	conFName?: String;
	conLName?: String;
	conAlias?: String;
	conPosition?: String;
	conTitle?: String;
	conDirectPhone?: String
	conEmail?: String;
	comDistrict?: String;
	comName?: String;
	comPhone?: String;
	actDate?: String;
}

interface ContactEntity {
  contact?: Contact,
  comments?: Array<Comment>,
  disciplines?: Array<Discipline>,
  affiliates?: Array<Affiliate>,
  reps?: Array<Rep>,
  findParams?: FindParams,
  findResults?: Array<FindResult>
}

@Injectable()
export class ContactsService {

  contactEntity: ContactEntity;

  constructor ( private http: Http ) {
    this.contactEntity = {
      findParams: {
        conName: '',
        conInactive: false,
        conActive: true
      }
    };
  }

  findContactsAdvAll(contactEntity:any){

      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', window.localStorage.getItem("Auth-token"));
      let options = new RequestOptions({ headers: headers });
      return this.http.post(
        'http://localhost:8080/restjpa/api/contacts/findcontactadvall',
        contactEntity,
        options
      ).map(response => response.json());

  }

  findContactsAdv(contactEntity:any){

      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', window.localStorage.getItem("Auth-token"));
      let options = new RequestOptions({ headers: headers });
      return this.http.post(
        'http://localhost:8080/restjpa/api/contacts/findcontactadv',
        contactEntity,
        options
      ).map(response => response.json());

  }
}
