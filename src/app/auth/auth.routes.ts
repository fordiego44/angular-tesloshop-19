import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { IsAdminGuard } from './guards/is-admin.guard';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'register',
        component: RegisterPageComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];



export default authRoutes;
