import { Routes } from '@angular/router';
import { ROUTER_PATH } from 'src/app/utils/router.utils';

export const routes: Routes = [
  {
    path: ROUTER_PATH.base.home,
    loadComponent: async () =>
      (await import('@pages/home/home.component')).HomeComponent,
  },
  {
    pathMatch: 'full',
    path: ROUTER_PATH.base.notFound,
    loadComponent: async () =>
      (await import('@pages/not-found/not-found.component')).NotFoundComponent,
  },
];
