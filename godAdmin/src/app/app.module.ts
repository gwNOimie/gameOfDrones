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
import { GearsListComponent } from './pages/gears-list/gears-list.component';
import { UsersListComponent } from './pages/users-list/users-list.component';

import { DroneUpdateComponent } from './modals/drone-update/drone-update.component';
import { GearUpdateComponent } from './modals/gear-update/gear-update.component';
import { UserUpdateComponent } from './modals/user-update/user-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    DronesListComponent,
    GearsListComponent,
    UsersListComponent,
    DroneUpdateComponent,
    GearUpdateComponent,
    UserUpdateComponent,
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
