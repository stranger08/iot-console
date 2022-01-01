import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { DevicesService } from '../../services/devices.service';

@Component({
    templateUrl: 'register.component.html',
})
export class RegisterDeviceComponent {

  constructor(
    private router: Router,
    private devicesService: DevicesService
  ) { }

  deviceForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    mac: new FormControl(''),
  });
  
  onSubmit() {
    console.log(this.deviceForm.value);
    this.devicesService.saveOne({
      ...this.deviceForm.value,
      registered: new Date(),
      status: "Active",
    }).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['devices']);
    });
  }

  cancel() {
    this.router.navigate(['devices']);
  }

}
