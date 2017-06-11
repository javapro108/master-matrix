import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { CreateComponent } from './create/create.component';
import { ChangeComponent } from './change/change.component';
import { DisplayComponent } from './display/display.component';


const routes: Routes = [
  { path: '', redirectTo: 'findcompany', pathMatch: 'full' },
  { path: 'find', component: SearchComponent },
  { path: 'create', component: CreateComponent },
  { path: 'change', component: ChangeComponent },
  { path: 'display', component: DisplayComponent }
];

export const ContactsRouting = RouterModule.forChild(routes);
