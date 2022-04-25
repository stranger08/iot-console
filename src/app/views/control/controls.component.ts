import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ControlService } from '../../services/control.service';

@Component({
    templateUrl: 'controls.component.html',
})
export class ControlsComponent {

    controls:any = [];

    constructor(
        private controlService: ControlService,
        private route: ActivatedRoute,
        private router: Router
    ) {

    }

    viewControl($id) {
        this.router.navigate(['view', $id], { relativeTo: this.route });
    }

    addControl() {
        this.router.navigate(['create'], { relativeTo: this.route });
    }

    ngOnInit() {
        this.controlService.findManyByProject().subscribe(resp => {
            this.controls = resp;
        });
    }
}
