import { Routes } from '@angular/router';
import { HomeComponent } from './auth/application/pages/home/home.component';
import { RegisterComponent } from './auth/application/pages/register/register.component';
import { MainViewComponent } from './user/UI/main-view/main-view.component';

export const routes: Routes = [
    { path: 'login', component: HomeComponent },
    { path: "", redirectTo: 'login', pathMatch: 'full' },
    { path: "register", component: RegisterComponent },
    { path: "main", component: MainViewComponent }
];
