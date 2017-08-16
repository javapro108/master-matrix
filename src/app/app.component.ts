import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { AppService } from './services/app.service';
import { AppMessage, GlobalObject } from './services/app.types';

import { Subscription } from 'rxjs/Subscription'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'app';
  globalObject: GlobalObject;
  showMessages: boolean = false;
  timeOutHandle: any;
  appServiceSub: Subscription;
  loginForm: FormGroup;
  showLogin: boolean = false;
  loginMessage: string;
  latestMessage: AppMessage = {};
  appMessages: AppMessage[] = [];

  constructor(
    private appService: AppService,
    private builder: FormBuilder
  ) {
    this.globalObject = appService.globalObject;
  }

  ngOnInit() {
    this.appServiceSub = this.appService.subscribe((data) => this.appServiceUpdate(data))
    this.loginForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.globalObject.busy = false;
  }

  ngOnDestroy() {
    this.appServiceSub.unsubscribe();
  }

  appServiceUpdate(data) {
    if (data && data.type == "NEW-MESSAGE") {
      this.latestMessage = this.appService.latestMessage;
      this.appMessages = this.appService.appMessages;
      this.showMessages = true;
      if (this.timeOutHandle) {
        clearTimeout(this.timeOutHandle);
      }
      this.timeOutHandle = setTimeout(() => this.showMessages = false, 5000);
    }
    if (data && data.type == "SHOW-MESSAGE") {
      this.latestMessage = this.appService.latestMessage;
      this.appMessages = this.appService.appMessages;
      this.showMessages = true;
    }
    if (data && data.type == "SHOW-LOGIN") {
      this.showLogin = true;
    }
  }

  showLoginForm() {
    this.loginMessage = "";
    this.showLogin = true;
  }

  onLogin() {
    this.loginForm.value.username;
    this.appService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((data) => this.loginSuccess(data), (error) => this.loginError(error));
  }

  loginSuccess(data) {
    if (data.token != undefined) {
      this.appService.setLoginUser(data);
      this.showLogin = false;
    } else {
      this.loginMessage = "Invalid valid username or password.";
    }
  }

  loginError(error) {
    console.log(error);
    this.loginMessage = "Login error, please try again";
  }

  clearMessages() {
    this.appService.appMessages = [];
    this.appMessages = [];
  }

}
