import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }    from '@angular/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import {InputTextModule,DataTableModule,ButtonModule,DialogModule, MultiSelectModule,
        DropdownModule, PanelModule, CheckboxModule } from 'primeng/primeng';

import { CompanyRouting } from './company.routing';

import { SearchComponent } from './search/search.component';
import { CreateComponent } from './create/create.component';
import { ChangeComponent } from './change/change.component';
import { DisplayComponent } from './display/display.component';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, HttpModule, CompanyRouting,
             InputTextModule,DataTableModule,ButtonModule,DialogModule, MultiSelectModule,
             DropdownModule, PanelModule, CheckboxModule],
  declarations: [ SearchComponent, CreateComponent, ChangeComponent, DisplayComponent ],
  providers: [],
  exports: []
})
export class CompanyModule {
}
