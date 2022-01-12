import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { GroupsService } from '../../services/groups.service';
import { DevicesService } from '../../services/devices.service';
import { SessionService } from '../../services/session.service';


@Component({
    templateUrl: 'groups.component.html',
    styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent {

    @ViewChild('warningModal') public warningModal: ModalDirective;

    groups:any = [];
    devices:any = [];

    constructor(
        private sessionService: SessionService,
        private devicesService: DevicesService,
        private groupsService: GroupsService,
        private route: ActivatedRoute,
        private router: Router
    ) {

    }

    viewGroup($id) {
        this.router.navigate(['view', $id], { relativeTo: this.route });
    }

    viewDevice($id) {
        this.router.navigate(['devices', 'view', $id]);
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
        this.sessionService.projectChangeEvent.subscribe(projectId => this.retrieveDeviceGroups());
    }

    ngOnChanges() {
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
