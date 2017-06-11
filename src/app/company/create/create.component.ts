import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';

import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'create-company-view',
  templateUrl: './create.component.html',
  styles: [`
    create-company-view {
      display: flex;
      flex-flow: column;
      height: 100%;
    }
  `]
})
export class CreateComponent implements OnInit {

  companyForm: FormGroup;
  comName:String;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private companyService:CompanyService
  ){
    this.comName = "This is Test Name";
  }

  ngOnInit(): void{
   this.buildForm();
  }

  addCompany() {
     this.buildForm();
   }

  onSubmit() {
     debugger;
     console.log(this.comName);
     this.companyForm.markAsPristine();
     console.log(this.companyForm.value);
  }

  buildForm(): void{
    this.companyForm = this.formBuilder.group({
      comName : [this.comName, Validators.required],
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
    });
  }
}
