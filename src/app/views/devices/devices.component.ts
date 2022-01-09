import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DevicesService } from '../../services/devices.service';

@Component({
    templateUrl: 'devices.component.html',
})
export class DevicesComponent {

    devices:any = [];

    constructor(
        private devicesService: DevicesService,
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
        this.devicesService.findMany().subscribe(resp => {
            console.log(resp);
            this.devices = resp;
        });
    }
}
