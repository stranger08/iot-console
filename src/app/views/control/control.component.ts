import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ControlService } from '../../services/control.service';
import { DevicesService } from '../../services/devices.service';

@Component({
    templateUrl: 'control.component.html',
})
export class ControlComponent {

  constructor(
    private controlService: ControlService,
    private route: ActivatedRoute,
    private formBuilder : FormBuilder,
    private devicesService: DevicesService,
  ) {

  }

  private control:any = {};
  controlForm : FormGroup;
  devices:any = [];

  ngOnInit() {
    this.loadControl();
    this.retrieveDeviceList();
    this.controlForm = this.formBuilder.group({
      conditionsConfiguration: this.formBuilder.array([]),
      actionsConfiguration: this.formBuilder.array([]),
    });
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

  get conditionsConfiguration() {
    return this.controlForm.get('conditionsConfiguration') as FormArray;
  }

  get actionsConfiguration() {
    return this.controlForm.get('actionsConfiguration') as FormArray;
  }

  refreshConditionsConfigurationPanel(){
    // this.device.telemetry?.forEach(t => {
    //   this.telemetryConfiguration.push(this.formBuilder.group({
    //     name: [t.name],
    //     path: [t.path],
    //   }));
    // });
  }

  refreshSettingsConfigurationPanel() {
    // this.device.settings?.forEach(s => {
    //   this.settingsConfiguration.push(this.formBuilder.group({
    //     name: [s.name],
    //     type: [s.type],
    //     path: [s.path],
    //     value: [s.value],
    //   }));
    // });
  }

  addCondition() {
    this.conditionsConfiguration.push(this.formBuilder.group({
      device: [''],
      path: [''],
      operator: [''],
      value: [''],
    }));
    this.conditionsConfiguration.markAsDirty();
  }

  removeCondition(index) {
    this.conditionsConfiguration.removeAt(index);
    this.conditionsConfiguration.markAsDirty();
  }

  addAction() {
    this.actionsConfiguration.push(this.formBuilder.group({
      device: [''],
      setting: [''],
      value: [''],
    }));
    this.actionsConfiguration.markAsDirty();
  }

  removeAction(index) {
    this.actionsConfiguration.removeAt(index);
    this.actionsConfiguration.markAsDirty();
  }

  saveConditionsConfiguration() {
    // this.devicesService.saveOne({
    //   id: this.device.id,
    //   telemetry: this.telemetryConfiguration.value
    // }).subscribe(resp => {
    //   console.log(resp);
    //   this.device = resp;
    //   this.extractDeviceTelemetry();
    //   this.telemetryConfiguration.markAsPristine();
    // });
  }

  saveActionsConfiguration() {
    // this.devicesService.saveOne({
    //   id: this.device.id,
    //   settings: this.settingsConfiguration.value
    // }).subscribe(resp => {
    //   console.log(resp);
    //   this.device = resp;
    //   this.extractDeviceTelemetry();
    //   this.settingsConfiguration.markAsPristine();
    // });
  }

  pullDevice(i) {
    console.log(this.conditionsConfiguration.get(`${i}.device`).value);
    console.log(this.conditionsConfiguration.get(`${i}.path`));
  }

  retrieveDeviceList() {
    this.devicesService.findMany().subscribe(devices => {
        this.devices = devices;
    });
  }

}
