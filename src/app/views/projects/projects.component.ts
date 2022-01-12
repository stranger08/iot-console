import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectsService } from '../../services/projects.service';

@Component({
    templateUrl: 'projects.component.html',
})
export class ProjectsComponent {

    projects:any = [];

    constructor(
        private projectsService: ProjectsService,
        private route: ActivatedRoute,
        private router: Router
    ) {

    }

    viewProject($id) {
        this.router.navigate(['view', $id], { relativeTo: this.route });
    }

    addProject() {
        this.router.navigate(['create'], { relativeTo: this.route });
    }

    ngOnInit() {
        this.projectsService.findMany().subscribe(resp => {
            this.projects = resp;
        });
    }
}
