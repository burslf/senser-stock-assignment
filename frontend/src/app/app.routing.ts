import { Routes } from "@angular/router";

export const routes:Routes = [
    {path: '', children: [
        {
            path: '', loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
        },
        {
            path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(c => c.ProfileComponent)
        },
        {
            path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent)
        }
    ]}
]