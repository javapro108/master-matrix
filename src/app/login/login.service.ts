import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor ( private http: Http ) { }

  login(uName:String, pass:String){

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(
        'http://localhost:8080/restjpa/api/login',
        { uNamePass : btoa(uName + ':' + pass) },
        options
      ).map(response => response.json());

  }
}
