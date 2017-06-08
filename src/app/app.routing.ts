import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren:'./login/login.module' },
  { path: 'home', loadChildren:'./home/home.module' }
];

export const AppRouting = RouterModule.forRoot(routes);
