import { AuthGuard } from './guards/auth/auth.guard';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { RoutingModule } from './modules/routing/routing.module';

import { AuthService } from './services/auth/auth.service';
import { DatabaseService } from './services/database/database.service';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DronesListComponent } from './pages/drones-list/drones-list.component';
import { GearListComponent } from './pages/gear-list/gear-list.component';
import { PlayerListComponent } from './pages/player-list/player-list.component';

import { DroneUpdateComponent } from './modals/drone-update/drone-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    DronesListComponent,
    GearListComponent,
    PlayerListComponent,
    DroneUpdateComponent,
  ],
  entryComponents: [
    DroneUpdateComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [
    DatabaseService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
