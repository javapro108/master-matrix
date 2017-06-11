import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactsRouting } from './contacts.routing';

import { SearchComponent } from './search/search.component';
import { CreateComponent } from './create/create.component';
import { ChangeComponent } from './change/change.component';
import { DisplayComponent } from './display/display.component';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, ContactsRouting ],
  declarations: [ SearchComponent, CreateComponent, ChangeComponent, DisplayComponent ],
  providers: [],
  exports: []
})
export class ContactsModule {
}
