import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { HomeComponent } from './home/home.component';
import { HubsComponent } from './hubs/hubs.component';

import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
import { AlertComponent } from './alert/alert.component';
import { LightsComponent } from './lights/lights.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { KeysPipe } from './keys.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    HubsComponent,
    LightsComponent,
    RoomsComponent,
    SchedulesComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    NgbModule.forRoot()
  ],
  providers: [
    AlertService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
