import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
    { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
    { path: 'signup', loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent) },
    { path: '**', redirectTo: 'home' },

];
