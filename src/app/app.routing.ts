import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component'
import { LightsComponent } from './lights/lights.component'
import { RoomsComponent } from './rooms/rooms.component'
import { SchedulesComponent } from './schedules/schedules.component'
import { HubsComponent } from './hubs/hubs.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lights', component: LightsComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'schedules', component: SchedulesComponent },
  { path: 'hubs', component: HubsComponent },
  { path: '**', redirectTo: '' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});