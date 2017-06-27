import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import { CompanyService } from '../services/company.service';

const noop = () => {
};

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => { debugger; return CompanySearchComponent;}),
    multi: true
};

@Component({
  selector: 'company-with-search',
  templateUrl: './companysearch.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CompanySearchComponent implements OnInit, OnDestroy, ControlValueAccessor{
  displayDialog:boolean = false;
  comFindName:string;
  comName:string;
  findCompanyResults = [];
  selectedCompany:any;
  //The internal data model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;


  constructor(
    private companyService: CompanyService
  ){
    this.setCompany(this.companyService.companyEntity.company.comID,
                    this.companyService.companyEntity.company.comName);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }


  getSearchCompanyResults(){
    debugger;
    this.companyService.findCompany({
      findParams: {
        comName: this.comFindName,
        comInactive: false
      }
    }).subscribe((companyEntity) => {
      this.findCompanyResults = companyEntity.findCompanyResults;
    })
  }

  selectCompany(){
    this.value = this.selectedCompany.comID;
    this.comName = this.selectedCompany.comName;
    this.findCompanyResults = [];
    this.displayDialog = false;
  }

  setCompany(comId:string, comName:string){
    this.value = comId;
    this.comName = comName;
  }

  //get accessor
  get value(): any {
      return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
      if (v !== this.innerValue) {
          this.innerValue = v;
          this.onChangeCallback(v);
      }
  }

  //Set touched on blur
  onBlur() {
      this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
      if (value !== this.innerValue) {
          this.innerValue = value;
      }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
      this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
      this.onTouchedCallback = fn;
  }

}
