import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {
  }

  login() {
    this.sessionService.login();
    this.router.navigateByUrl('/');
  }
}
