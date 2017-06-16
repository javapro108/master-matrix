import { Injectable } from '@angular/core';
import { User } from './login.service';

@Injectable()
export class HomeService {
  displaySideNav:String = 'show';
  user:User;

  constructor(){
    this.displaySideNav = 'show';
  }

  toggleSideNav(){
    if (this.displaySideNav == 'show') {
      this.displaySideNav = 'hide';
    } else {
      this.displaySideNav = 'show';
    }
  }
}
