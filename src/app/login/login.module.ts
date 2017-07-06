import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule, InputTextModule, SharedModule, BlockUIModule } from 'primeng/primeng';

import { LoginComponent } from './login.component';
import { LoginRouting } from './login.routing';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LoginRouting,
            ButtonModule, InputTextModule, SharedModule, BlockUIModule],
  declarations: [LoginComponent],
  providers: [],
  exports: []
})
export class LoginModule {

}
