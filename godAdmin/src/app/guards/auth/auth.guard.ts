import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/login', { source: route.url[0].path }]);
    }
    return false;
  }

}
