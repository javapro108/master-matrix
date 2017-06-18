import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'display-contacts-view',
  templateUrl: './display.component.html'
})
export class DisplayComponent implements OnInit, OnDestroy{
  subscription: Subscription;

  constructor(
    private companyService:CompanyService,
    private router: Router){}

  ngOnInit() {
    this.subscription = this.companyService.subscribe((data)=>this.rxUpdate(data));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  rxUpdate(data){
    debugger;
    if (data.type == 'DISPLAY'){
      this.companyService.getCompany(data.data)
          .subscribe(data => this.companyReceived(data) );
    }
  }

  companyReceived(data){
    debugger;
    this.companyService.companyEntity.company = data.company;
    this.companyService.companyEntity.comments = data.comments;
  }

}
