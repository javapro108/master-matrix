import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';

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
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private homeService: HomeService){}

  ngOnInit(){
  }
}
