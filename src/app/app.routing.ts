import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', loadChildren:'./login/login.module' },
  { path: 'home', loadChildren:'./home/home.module' }
//  { path: '', redirectTo: 'login', pathMatch: 'full' },
//  { path: '**', redirectTo: 'login' },
];

export const AppRouting = RouterModule.forRoot(routes);
