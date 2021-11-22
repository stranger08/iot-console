import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { navItems } from '../../_nav';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {

  constructor (
    private router: Router,
    private sessionSerivce: SessionService
  ) {
  }

  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.sessionSerivce.logout();
    this.router.navigateByUrl('/');
  }
}
