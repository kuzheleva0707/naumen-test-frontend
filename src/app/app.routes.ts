import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', loadComponent: () => import('./user-list/user-list.component').then(m => m.UserListComponent) }
];
