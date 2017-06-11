import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LoginComponent } from './login.component';
import { LoginRouting } from './login.routing';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LoginRouting],
  declarations: [LoginComponent],
  providers: [],
  exports: []
})
export default class LoginModule {

}
