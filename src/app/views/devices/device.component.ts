import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DevicesService } from '../../services/devices.service';

@Component({
    templateUrl: 'device.component.html',
})
export class DeviceComponent {

  constructor(
    private route: ActivatedRoute,
    private devicesService: DevicesService,
  ) {

  }

  private device:any = {};

  ngOnInit() {
    this.route.params.subscribe(params => {
      const ID = params['id'];
      this.devicesService.findOne(ID).subscribe(resp => {
        this.device = resp;
      });
    });
  }

}
