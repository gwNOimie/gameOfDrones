import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login: string;
  password: string;
  source: string;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.source = '/';
      if (params['source']) {
        this.source = params['source'];
      }
    });
  }

  logIn() {
    this.auth.login(this.login, this.password, this.source = null);
  }

  isValid() {
    return (this.login && this.password);
  }
}
