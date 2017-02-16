import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component'
import { HubsComponent } from './hubs/hubs.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hubs', component: HubsComponent },
  { path: '**', redirectTo: '' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});