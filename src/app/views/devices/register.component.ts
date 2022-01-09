import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { DevicesService } from '../../services/devices.service';
import { GroupsService } from '../../services/groups.service';

@Component({
    templateUrl: 'register.component.html',
})
export class RegisterDeviceComponent {

  constructor(
    private router: Router,
    private groupsService: GroupsService,
    private devicesService: DevicesService
  ) { }

  deviceForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    group: new FormControl(''),
    mac: new FormControl(''),
  });

  groups:any = [];
  ngOnInit() {
    this.groupsService.findMany().subscribe(groups => {
      this.groups = groups;
    });
  }
  
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
