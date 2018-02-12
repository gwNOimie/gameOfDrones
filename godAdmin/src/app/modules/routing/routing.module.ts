import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../../guards/auth/auth.guard';

import { HomeComponent } from '../../pages/home/home.component';
import { LoginComponent } from '../../pages/login/login.component';
import { PageNotFoundComponent } from '../../pages/page-not-found/page-not-found.component';
import { DronesListComponent } from '../../pages/drones-list/drones-list.component';
import { GearListComponent } from '../../pages/gear-list/gear-list.component';
import { PlayerListComponent } from '../../pages/player-list/player-list.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'drones', component: DronesListComponent, canActivate: [AuthGuard] },
  { path: 'players', component: PlayerListComponent, canActivate: [AuthGuard] },
  { path: 'gears', component: GearListComponent, canActivate: [AuthGuard] },
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
