import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppService } from './services/app.service';

import { Subscription } from 'rxjs/Subscription'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  title = 'app';
  showMessages: boolean;
  appServiceSub : Subscription;

  constructor(
    private appService: AppService
  ){}

  ngOnInit(){
    this.appServiceSub = this.appService.subscribe((data)=>this.appServiceUpdate(data))
  }

  ngOnDestroy(){
    this.appServiceSub.unsubscribe();
  }

  appServiceUpdate(data){
    if (data && data.type == "MESSAGE"){
      
    }
  }

}
