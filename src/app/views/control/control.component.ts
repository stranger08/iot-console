import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ControlService } from '../../services/control.service';

@Component({
    templateUrl: 'control.component.html',
})
export class ControlComponent {

  constructor(
    private controlService: ControlService,
    private route: ActivatedRoute,
  ) {

  }

  private control:any = {};

  ngOnInit() {
    this.loadControl();
  }

  loadControl() {
    this.route.params.subscribe(params => {
      const ID = params['id'];

      this.controlService.findOne(ID).subscribe(resp => {
        this.control = resp;

        this.route.data.subscribe(data => {
          data.title = resp['name'];
        });
      });
    });
  }
}
