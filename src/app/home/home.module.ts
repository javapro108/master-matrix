import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ToolbarModule, ButtonModule, PanelMenuModule, SplitButtonModule } from 'primeng/primeng';

import { HomeComponent } from './home.component';
import { HeaderComponent } from './header.component';
import { NavigationComponent } from './navigation.component';
import { HomeRouting } from './home.routing';

@NgModule({
  imports: [ CommonModule, FormsModule, ToolbarModule,
             ToolbarModule, ButtonModule, PanelMenuModule, SplitButtonModule,
             HomeRouting ],
  declarations: [HomeComponent, HeaderComponent, NavigationComponent],
  providers: [],
  exports: []
})
export class HomeModule {

}
