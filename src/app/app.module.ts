import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRouting }  from './app.routing';

import { LoginService } from './services/login.service';
import { CompanyService } from './services/company.service';
import { ContactsService } from './services/contacts.service';


@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRouting,
  ],

  providers: [
    LoginService,
    CompanyService,
    ContactsService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
