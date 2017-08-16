import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';

import { AppService } from './app.service';
import { EmployeeEntity } from './employee.types';


@Injectable()
export class EmployeeService {

    rxService: BehaviorSubject<any>;

    constructor(
        private http: Http,
        private appService: AppService
    ) {
        this.rxService = new BehaviorSubject({});
    }

    subscribe(next, error?, complete?) {
        return this.rxService.subscribe(next, error, complete);
    }

    pushData(data) {
        this.rxService.next(data);
    }

    getAllEmployees() {
        return this.appService.httpGet('employee/getallemployees');
    }

    getEmployee(empUName: string, lock?: boolean) {
        let url: string;
        if (lock == true) {
            url = 'employee/get(' + empUName + ')?lock=' + lock;
        } else {
            url = 'employee/get(' + empUName + ')';
        }
        return this.appService.httpGet(url);
    }

    createEmployee(employeeEntity: EmployeeEntity) {
        return this.appService.httpPost('employee/create', employeeEntity)
    }

    changeEmployee(employeeEntity: EmployeeEntity) {
        return this.appService.httpPost('employee/change', employeeEntity)
    }


}