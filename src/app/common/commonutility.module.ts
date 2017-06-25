import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import {InputTextModule, InputTextareaModule, DataTableModule, ButtonModule,
  DialogModule, MultiSelectModule, DropdownModule, PanelModule, CheckboxModule,
  BlockUIModule, CalendarModule, InputMaskModule } from 'primeng/primeng';

import { CompanySearchComponent } from './companysearch.component';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule,
             InputTextModule, DataTableModule, ButtonModule, DialogModule, MultiSelectModule,
             DropdownModule, PanelModule, CheckboxModule,  CalendarModule, InputMaskModule ],
  declarations: [ CompanySearchComponent ],
  providers: [],
  exports: [ CompanySearchComponent ]
})
export class CommonUtilityModule {
}
