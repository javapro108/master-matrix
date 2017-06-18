import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }    from '@angular/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import {InputTextModule, InputTextareaModule, DataTableModule, ButtonModule,
  DialogModule, MultiSelectModule, DropdownModule, PanelModule, CheckboxModule,
  BlockUIModule, InputMaskModule
} from 'primeng/primeng';

import { CompanyRouting } from './company.routing';

import { SearchComponent } from './search/search.component';
import { CreateComponent } from './create/create.component';
import { ChangeComponent } from './change/change.component';
import { DisplayComponent } from './display/display.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpModule, CompanyRouting,
    InputTextModule, InputTextareaModule, DataTableModule, ButtonModule, DialogModule,
    MultiSelectModule, DropdownModule, PanelModule, CheckboxModule, BlockUIModule,
    InputMaskModule
  ],
  declarations: [SearchComponent, CreateComponent, ChangeComponent, DisplayComponent],
  providers: [],
  exports: []
})
export class CompanyModule {
}
