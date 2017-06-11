import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'search-company-view',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private companyService:CompanyService
  ){}


  searchForm: FormGroup = this.builder.group({
    comName:     [this.companyService.companyEntity.findParams.comName,     Validators.required],
    comInactive: [this.companyService.companyEntity.findParams.comInactive, Validators.required]
  });

  onFind(){
    debugger;
    this.companyService.companyEntity.findParams = this.searchForm.value;
    this.companyService.findCompany(this.companyService.companyEntity)
        .subscribe(this.findSuccess.bind(this), this.findError.bind(this));
  }

  findSuccess(findResult){
    debugger;
    this.companyService.companyEntity.findCompanyResults = findResult.findCompanyResults;
  }
  findError(error){
    debugger;
    console.log(error);
  }



}
