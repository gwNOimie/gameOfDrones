import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../../guards/auth/auth.guard';

import { HomeComponent } from '../../pages/home/home.component';
import { LoginComponent } from '../../pages/login/login.component';
import { PageNotFoundComponent } from '../../pages/page-not-found/page-not-found.component';
import { DronesListComponent } from '../../pages/drones-list/drones-list.component';
import { EngineListComponent } from '../../pages/engine-list/engine-list.component';
import { PropellerListComponent } from '../../pages/propeller-list/propeller-list.component';
import { ShieldListComponent } from '../../pages/shield-list/shield-list.component';
import { WeaponListComponent } from '../../pages/weapon-list/weapon-list.component';
import { GearListComponent } from '../../pages/gear-list/gear-list.component';
import { AttackListComponent } from '../../pages/attack-list/attack-list.component';
import { FireBonusListComponent } from '../../pages/fire-bonus-list/fire-bonus-list.component';
import { ElectricityBonusListComponent } from '../../pages/electricity-bonus-list/electricity-bonus-list.component';
import { ExplosiveBonusListComponent } from '../../pages/explosive-bonus-list/explosive-bonus-list.component';
import { PlayerListComponent } from '../../pages/player-list/player-list.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'drones', component: DronesListComponent, canActivate: [AuthGuard] },
  { path: 'players', component: PlayerListComponent, canActivate: [AuthGuard] },
  { path: 'attacks', component: AttackListComponent, canActivate: [AuthGuard] },
  { path: 'gears', component: GearListComponent, canActivate: [AuthGuard] },
  { path: 'engines', component: EngineListComponent, canActivate: [AuthGuard] },
  { path: 'shields', component: ShieldListComponent, canActivate: [AuthGuard] },
  { path: 'weapons', component: WeaponListComponent, canActivate: [AuthGuard] },
  { path: 'propellers', component: PropellerListComponent, canActivate: [AuthGuard] },
  { path: 'fire', component: FireBonusListComponent, canActivate: [AuthGuard] },
  { path: 'electricity', component: ElectricityBonusListComponent, canActivate: [AuthGuard] },
  { path: 'explosive', component: ExplosiveBonusListComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
