import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {InputTextModule,DataTableModule,ButtonModule,DialogModule, MultiSelectModule,
        DropdownModule, PanelModule, CheckboxModule, CalendarModule, InputMaskModule,
        BlockUIModule } from 'primeng/primeng';

import { CommonUtilityModule } from '../common/commonutility.module';

import { ContactsRouting } from './contacts.routing';

import { SearchComponent } from './search/search.component';
import { CreateComponent } from './create/create.component';
import { ChangeComponent } from './change/change.component';
import { DisplayComponent } from './display/display.component';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule,

             InputTextModule, DataTableModule, ButtonModule, DialogModule, MultiSelectModule,
             DropdownModule, PanelModule, CheckboxModule,  CalendarModule, InputMaskModule,
             BlockUIModule,

             ContactsRouting, CommonUtilityModule ],
  declarations: [ SearchComponent, CreateComponent, ChangeComponent, DisplayComponent ],
  providers: [],
  exports: []
})
export class ContactsModule {
}
