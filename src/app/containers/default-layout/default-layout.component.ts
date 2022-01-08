import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';
import { navItems } from '../../_nav';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  constructor (
    private router: Router,
    private sessionSerivce: SessionService
  ) {
  }

  public sidebarMinimized = false;
  public navItems:INavData[];

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit() {
    this.navItems = navItems;
    //this.navItems = navItems.filter(n => n.attributes?.user);
  }

  logout() {
    this.sessionSerivce.logout();
    this.router.navigateByUrl('/');
  }
}
