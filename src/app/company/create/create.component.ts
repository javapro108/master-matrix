import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';

import { AppService } from '../../services/app.service';
import { CompanyService } from '../../services/company.service';
import { CompanyEntity, TblCompany, TblCompanyComment } from '../../services/company.types';

@Component({
  selector: 'create-company-view',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  busy:Boolean = false;
  companyForm: FormGroup;

  constructor(
    private router: Router,
    private activeRoute:ActivatedRoute,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private companyService:CompanyService
  ){
    debugger;
  }

  ngOnInit(): void{
   this.buildForm();
  }

  addCompany() {
     this.buildForm();
   }

  buildForm(): void{
    this.companyForm = this.formBuilder.group({
      comName : ['', Validators.required],
      comAlias :'',
      comPhone: ['', Validators.required],
      comFax :'',
      comTollFree :'',
      comDistrict: ['', Validators.required],
      comWeb:'',
      comAddress :['', Validators.required],
      comAddress2 :'',
      comCity :['', Validators.required],
      comState :['', Validators.required],
      comZip :['', Validators.required],
      comCountry :['', Validators.required],
      comDirections :'',
      comMailAddress1 :['', Validators.required],
      comMailAddress2 :'',
      comMailCity :['', Validators.required],
      comMailState :['', Validators.required],
      comMailZip :['', Validators.required],
      comMailCountry :['', Validators.required],
      comDeliveryAddress1 :['', Validators.required],
      comDeliveryAddress2 :'',
      comDeliveryCity :['', Validators.required],
      comDeliveryState :['', Validators.required],
      comDeliveryZip :['', Validators.required],
      comDeliveryCountry :['', Validators.required],
      comDeliveryDirections :'',
      comDirectionComments :'',
      cmcComment :'',
      cmcPriority: false
    });
  }

  onSubmit() {
    debugger;
    let company: TblCompany = {};
    let comment: TblCompanyComment = {};
    let companyEntity : CompanyEntity = {};
    company = this.companyForm.value;
    company.comInactive = false;
    comment = {
     cmcComment: this.companyForm.value.cmcComment,
     cmcPriority: this.companyForm.value.cmcPriority
    };
    companyEntity.company = company;
    companyEntity.comments = [comment];

    this.companyService.createCompany(companyEntity)
        .subscribe((data) => this.createSuccess(data),(error) => this.createError(error));
    this.companyForm.markAsPristine();
    console.log(this.companyForm.value);
  }

  createSuccess(companyEntity){
    this.companyService.companyEntity.company = companyEntity.company;
    this.router.navigate(['../../contacts/create'], { relativeTo: this.activeRoute });
  }

  createError(error){
    console.log(error);
  }

}
