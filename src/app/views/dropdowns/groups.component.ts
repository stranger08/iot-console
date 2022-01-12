import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GroupsService } from '../../services/groups.service';

@Component({
    templateUrl: 'groups.component.html',
})
export class GroupsComponent {

    groups:any = [];

    constructor(
        private groupsService: GroupsService,
        private route: ActivatedRoute,
        private router: Router
    ) {

    }

    viewGroup($id) {
        this.router.navigate(['view', $id], { relativeTo: this.route });
    }

    addGroup() {
        this.router.navigate(['create'], { relativeTo: this.route });
    }

    ngOnInit() {
        this.groupsService.findMany().subscribe(resp => {
            this.groups = resp;
        });
    }
}
