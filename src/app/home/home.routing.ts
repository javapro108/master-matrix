import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: 'company',  loadChildren: '../company/company.module#CompanyModule' } ,
      { path: 'contacts', loadChildren: '../contacts/contacts.module#ContactsModule'}
    ]
  },
];


export const HomeRouting = RouterModule.forChild(routes);
