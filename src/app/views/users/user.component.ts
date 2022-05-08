import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { DevicesService } from '../../services/devices.service';

@Component({
    templateUrl: 'user.component.html',
})
export class UserComponent {

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private devicesService: DevicesService,
  ) {

  }

  device:any = {};

  ngOnInit() {
    this.route.params.subscribe(params => {
      const ID = params['id'];

      this.devicesService.findOne(ID).subscribe(resp => {
        this.device = resp;

        this.route.data.subscribe(data => {
          data.title = resp['name'];
        });
      });
    });
  }

}
