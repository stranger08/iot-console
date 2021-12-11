import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../../services/users.service';

@Component({
    templateUrl: 'users.component.html',
})
export class UsersComponent {

    users:any = [];

    constructor(
        private usersService: UsersService,
        private route: ActivatedRoute,
        private router: Router
    ) {

    }

    viewDevice($id) {
        this.router.navigate(['view', $id], { relativeTo: this.route });
    }

    addDevice() {
        this.router.navigate(['create'], { relativeTo: this.route });
    }

    ngOnInit() {
        this.usersService.findMany().subscribe(resp => {
            this.users = resp;
        });
    }
}
