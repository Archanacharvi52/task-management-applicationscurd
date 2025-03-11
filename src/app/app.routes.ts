import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { TasksComponent } from './pages/tasks/tasks.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent // HomeComponent is the default page
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'tasks',
        component: TasksComponent // Route for the Tasks page
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ]
    }
];
