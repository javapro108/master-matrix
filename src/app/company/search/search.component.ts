import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'search-company-view',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  busy:Boolean = false;

  constructor(
    private router: Router,
    private activeRoute:ActivatedRoute,
    private builder: FormBuilder,
    private companyService:CompanyService
  ){}


  searchForm: FormGroup = this.builder.group({
    comName:     [this.companyService.companyEntity.findParams.comName,     Validators.required],
    comInactive: [this.companyService.companyEntity.findParams.comInactive]
  });

  onFind(){
    this.companyService.companyEntity.findParams = this.searchForm.value;
    if (this.companyService.companyEntity.findParams.comInactive != true ) {
      this.companyService.companyEntity.findParams.comInactive = false;
    }
    this.companyService.findCompany(this.companyService.companyEntity)
        .subscribe(this.findSuccess.bind(this), this.findError.bind(this));
    this.busy = true;
  }

  displayCompany(company) {
    this.companyService.pushData({ type:'DISPLAY-FROM-SEARCH', data:company.comID });
    this.router.navigate(['../display'], { relativeTo: this.activeRoute });
  }

  changeCompany(company) {
    this.companyService.pushData({ type:'CHANGE-FROM-SEARCH', data:company.comID });
    this.router.navigate(['../change'], { relativeTo: this.activeRoute });
  }

  findSuccess(findResult){
    debugger;
    this.busy = false;
    this.companyService.companyEntity.findCompanyResults = findResult.findCompanyResults;
  }
  findError(error){
    debugger;
    this.busy = false;
    console.log(error);
  }

}
