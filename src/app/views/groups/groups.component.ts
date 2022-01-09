import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { GroupsService } from '../../services/groups.service';
import { DevicesService } from '../../services/devices.service';

@Component({
    templateUrl: 'groups.component.html',
    styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent {

    @ViewChild('warningModal') public warningModal: ModalDirective;

    groups:any = [];
    devices:any = [];

    constructor(
        private devicesService: DevicesService,
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

    removeGroupConfirm(id) {
        this.removeGroupId = id;
        this.warningModal.show();
    }

    removeGroupId:any;

    removeGroup() {
        this.groupsService.deleteOne(this.removeGroupId).subscribe(r => {
            this.warningModal.hide();
            this.retrieveDeviceGroups();
        });
    }

    ngOnInit() {
        this.retrieveDeviceGroups();
    }

    retrieveDeviceGroups() {
        this.groupsService.findMany().subscribe(groups => {
            this.groups = groups;
        });

        this.devicesService.findMany().subscribe(devices => {
            this.devices = devices;
            this.groups.forEach(group => {
                group.devices = this.devices.filter(d => d.group_id == group.id)
            });
        });
    }
}
