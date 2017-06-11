import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {

  constructor ( private http: Http ) { }

  findContactsAdvAll(companyEntity:any){

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(
        'http://localhost:8080/restjpa/api/company/findcompany',
        companyEntity,
        options
      ).map(response => response.json());

  }
}
