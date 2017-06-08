import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { LoginRouting } from './login.routing';

@NgModule({
  imports: [CommonModule, FormsModule, HttpModule, LoginRouting],
  declarations: [LoginComponent],
  providers: [LoginService],
  exports: []
})
export default class LoginModule {

}
