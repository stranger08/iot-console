import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { DevicesService } from '../../services/devices.service';

@Component({
    templateUrl: 'devices.component.html',
})
export class DevicesComponent {

    @ViewChild('warningModal') public warningModal: ModalDirective;

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
        this.retrieveDeviceList();
    }

    retrieveDeviceList() {
        this.devicesService.findMany().subscribe(devices => {
            this.devices = devices;
        });
    }

    removeDeviceConfirm(id) {
        this.removeDeviceId = id;
        this.warningModal.show();
    }

    removeDeviceId:any;

    removeDevice() {
        this.devicesService.deleteOne(this.removeDeviceId).subscribe(r => {
            this.warningModal.hide();
            this.retrieveDeviceList();
        });
    }
}
