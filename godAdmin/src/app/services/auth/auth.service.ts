import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private currentUser;
  constructor(
    private router: Router,
  ) { }

  login(login, password, source = null) {
    // TODO: connect via backend
    this.currentUser = {
      name: 'Admin',
      isAdmin: true
    };
    let dest = '/';
    if (source) {
      dest += source;
    }
    this.router.navigate([dest]);
  }

  logout() {
    // TODO: disconnect via backend
    this.currentUser = undefined;
    this.router.navigate(['/login']);
  }

  isAdmin() {
    return (this.currentUser && this.currentUser.isAdmin);
  }
}
