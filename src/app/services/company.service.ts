import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

interface Company {
}

interface Comment {

}

interface FindParams {
  comName?: String;
  comInactive?: Boolean;
}

interface FindCompanyResult {
  comID?: String;
  comName?: String;
  comAlias?: String;
  comCity?: String;
  comState?: String;
}

interface CompanyEntity {
  company?: Company;
  comments?: Array<any>;
  findParams?: FindParams;
  findCompanyResults?: Array<FindCompanyResult>;
}




@Injectable()
export class CompanyService {
  companyEntity:CompanyEntity;
  constructor ( private http: Http ) {
    console.log('Company Service Initialized');
    this.companyEntity = {
      findParams: { comName:'' }
    };
  }

  findCompany(companyEntity:any){

      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', window.localStorage.getItem("Auth-token"));
      let options = new RequestOptions({ headers: headers });
      return this.http.post(
        'http://localhost:8080/restjpa/api/company/findcompany',
        companyEntity,
        options
      ).map(response => response.json());

  }
}
