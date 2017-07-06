import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
// Direct linking
//  { path: 'login', component: LoginComponent },
//  { path: 'home', component: HomeComponent }

// Lazy Loading
  { path: 'login', loadChildren:'./login/login.module#LoginModule' },
  { path: 'home', loadChildren:'./home/home.module#HomeModule' }
//  { path: '', redirectTo: 'login', pathMatch: 'full' },
//  { path: '**', redirectTo: 'login' },
];

export const AppRouting = RouterModule.forRoot(routes, { useHash: true });
