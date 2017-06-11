import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { HeaderComponent } from './header.component';
import { NavigationComponent } from './navigation.component';
import { HomeRouting } from './home.routing';

@NgModule({
  imports: [CommonModule, FormsModule, HomeRouting],
  declarations: [HomeComponent, HeaderComponent, NavigationComponent],
  providers: [],
  exports: []
})
export default class HomeModule {

}
