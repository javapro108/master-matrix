import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: 'company', loadChildren: '../company/company.module' },
      { path: 'contacts', loadChildren: '../contacts/contacts.module' }
    ]
  },

];

export const HomeRouting = RouterModule.forChild(routes);
