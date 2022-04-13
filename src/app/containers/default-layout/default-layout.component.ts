import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';
import { navItems } from '../../_nav';

import { SessionService } from '../../services/session.service';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  constructor (
    private router: Router,
    private sessionSerivce: SessionService,
    private projectsService: ProjectsService,
    private sessionService: SessionService,
  ) {
  }

  public sidebarMinimized = false;
  public navItems:INavData[];

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit() {
    //this.navItems = navItems.filter(n => n.attributes?.user);
    this.navItems = navItems;
    this.loadUserProjects();
    
  }

  projects:any = [];
  selectedProject:any;
  loadUserProjects() {
    this.projectsService
      .findUserProjects()
      .subscribe(projects => {
      this.projects = projects;
      if (projects['length'] > 0) {
        this.selectProject(projects[0].id);
      }
    });
  }

  logout() {
    this.sessionSerivce.logout();
    this.router.navigateByUrl('/');
  }

  selectProject(projectId) {
    console.log("selecting project", projectId);
    this.selectedProject = this.projects.find(p => p.id == projectId);
    this.sessionSerivce.setSelectedProject(projectId);
    this.router.navigate(['']);
  }
}
