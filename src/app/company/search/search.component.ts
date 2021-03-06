import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AppService } from '../../services/app.service';
import { BaseComponent } from '../../common/base.component';
import { CompanyService } from '../../services/company.service';
import { FindCompanyResult } from '../../services/company.types';


@Component({
  selector: 'search-company-view',
  templateUrl: './search.component.html'
})
export class SearchComponent extends BaseComponent implements OnInit, OnDestroy {

  busy: Boolean = false;
  searchForm: FormGroup;
  findCompanyResults: FindCompanyResult[];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private builder: FormBuilder,
    private appService: AppService,
    private companyService: CompanyService
  ) {
    super();
    this.globalObject = appService.globalObject;
  }

  ngOnInit() {
    this.searchForm = this.builder.group({
      comName: [this.companyService.companyEntity.findParams.comName, Validators.required],
      comInactive: [this.companyService.companyEntity.findParams.comInactive]
    });
    this.findCompanyResults = this.companyService.companyEntity.findCompanyResults;
  }

  ngOnDestroy() {

  }

  onFind() {
    this.companyService.companyEntity.findParams = this.searchForm.value;

    if (this.companyService.companyEntity.findParams.comInactive != true) {
      this.companyService.companyEntity.findParams.comInactive = false;
    }
    this.companyService.findCompany(this.companyService.companyEntity)
      .subscribe(this.findSuccess.bind(this), this.findError.bind(this));
    this.busy = true;
  }

  displayCompany(company) {
    //    this.companyService.pushData({ type:'DISPLAY-FROM-SEARCH', data:company.comID });
    this.router.navigate(['../display', company.comID], { relativeTo: this.activeRoute });
  }

  changeCompany(company) {
    //    this.companyService.pushData({ type:'CHANGE-FROM-SEARCH', data:company.comID });
    this.router.navigate(['../change', company.comID], { relativeTo: this.activeRoute });
  }

  findSuccess(findResult) {
    this.busy = false;
    this.findCompanyResults = findResult.findCompanyResults;
    this.companyService.companyEntity.findCompanyResults = findResult.findCompanyResults;
  }
  findError(error) {
    this.busy = false;
    this.findCompanyResults = [];
    this.companyService.companyEntity.findCompanyResults = [];
    if (error.status = 401) {
      this.appService.pushData({ type: "SHOW-LOGIN" });
    } else {
      console.log(error);
    }
  }

}
