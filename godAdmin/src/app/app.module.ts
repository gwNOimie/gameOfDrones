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
import { EngineListComponent } from './pages/engine-list/engine-list.component';
import { PropellerListComponent } from './pages/propeller-list/propeller-list.component';
import { ShieldListComponent } from './pages/shield-list/shield-list.component';
import { WeaponListComponent } from './pages/weapon-list/weapon-list.component';
import { GearListComponent } from './pages/gear-list/gear-list.component';
import { AttackListComponent } from './pages/attack-list/attack-list.component';
import { FireBonusListComponent } from './pages/fire-bonus-list/fire-bonus-list.component';
import { ElectricityBonusListComponent } from './pages/electricity-bonus-list/electricity-bonus-list.component';
import { ExplosiveBonusListComponent } from './pages/explosive-bonus-list/explosive-bonus-list.component';
import { PlayerListComponent } from './pages/player-list/player-list.component';

import { DroneUpdateComponent } from './modals/drone-update/drone-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    DronesListComponent,
    EngineListComponent,
    PropellerListComponent,
    ShieldListComponent,
    WeaponListComponent,
    GearListComponent,
    AttackListComponent,
    FireBonusListComponent,
    ElectricityBonusListComponent,
    ExplosiveBonusListComponent,
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
