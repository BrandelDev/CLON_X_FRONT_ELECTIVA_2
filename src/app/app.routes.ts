import { Routes } from '@angular/router';
import { HomeComponent } from './auth/application/pages/home/home.component';
import { RegisterComponent } from './auth/application/pages/register/register.component';

export const routes: Routes = [
    { path: 'login', component: HomeComponent },
    { path: "", redirectTo: 'login', pathMatch: 'full' },
    { path: "register", component: RegisterComponent }
];
