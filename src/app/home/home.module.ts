import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ToolbarModule, ButtonModule, PanelMenuModule } from 'primeng/primeng';

import { HomeComponent } from './home.component';
import { HeaderComponent } from './header.component';
import { NavigationComponent } from './navigation.component';
import { HomeRouting } from './home.routing';

@NgModule({
  imports: [CommonModule, FormsModule, ToolbarModule, HomeRouting,
            ToolbarModule, ButtonModule, PanelMenuModule ],
  declarations: [HomeComponent, HeaderComponent, NavigationComponent],
  providers: [],
  exports: []
})
export class HomeModule {

}
