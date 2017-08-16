import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { BaseComponent } from '../common/base.component';
import { AppService } from '../services/app.service';

@Component({
  selector: 'home-view',
  templateUrl: './home.component.html',
  animations: [
    trigger('toggleSideNav', [
      state('show', style({
        width: '200px'
      })),
      state('hide', style({
        width: '0px'
      })),
      transition('hide => show', animate('250ms ease-out')),
      transition('show => hide', animate('250ms ease-in'))
    ])
  ]
})
export class HomeComponent extends BaseComponent implements OnInit, OnDestroy {

  appService: AppService;
  appSub: Subscription;
  displaySideNav: string = 'show';

  constructor(
    private router: Router,
    appService: AppService
  ) {
    super();
    this.appService = appService;
    this.globalObject = appService.globalObject;
    this.displaySideNav = 'show';
  }

  ngOnInit() {
    this.appService.initApp();
    this.appSub = this.appService.subscribe((data) => this.rxUpdate(data));
  }

  ngOnDestroy() {
    this.appSub.unsubscribe();
  }


  rxUpdate(data) {
    if (data.type == 'TOGGLE-SIDE-NAV') {
      if (this.displaySideNav == 'show') {
        this.displaySideNav = 'hide';
      } else {
        this.displaySideNav = 'show';
      }
    }
  }

}
