import { Routes } from '@angular/router';
import { HomeComponent } from './auth/application/pages/home/home.component';
import { RegisterComponent } from './auth/application/pages/register/register.component';
import { MainViewComponent } from './user/UI/main-view/main-view.component';
import { UserProfileViewComponent } from './user/UI/profile/user-profile-view/user-profile-view.component';
import { FeedComponent } from './components/feed/feed.component';

export const routes: Routes = [
    {
        path:'',
        component: MainViewComponent,
        children: [
            { path: '', component: MainViewComponent },
            { path: 'profile', component: UserProfileViewComponent },
            { path:'main/feed', component: FeedComponent}
        ]
    },
    { path: 'login', component: HomeComponent },
    { path: "", redirectTo: 'login', pathMatch: 'full' },
    { path: "register", component: RegisterComponent },
];
