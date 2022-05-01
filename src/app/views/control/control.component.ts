import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
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
    private ref: ChangeDetectorRef,
  ) {

  }

  private control:any = {};
  controlForm : FormGroup;
  devices:any = [];

  ngOnInit() {
    this.retrieveDeviceList();
    this.controlForm = this.formBuilder.group({
      conditionsConfiguration: this.formBuilder.array([]),
      actionsConfiguration: this.formBuilder.array([]),
    });
    this.loadControl();
  }

  loadControl() {
    this.route.params.subscribe(params => {
      const ID = params['id'];

      this.controlService.findOne(ID).subscribe(resp => {
        console.log(resp);
        this.control = resp;
        this.refreshConditionsConfigurationPanel();
        this.refreshActionsConfigurationPanel();
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
    this.control.conditions?.forEach(c => {
      this.conditionsConfiguration.push(this.formBuilder.group(c))
    });
  }

  refreshActionsConfigurationPanel() {    
    this.control.actions?.forEach(a => {
      this.actionsConfiguration.push(this.formBuilder.group({
        device: [a.device],
        setting: [a.setting],
        value: [this.getValueField(a.value)]
      }));
    });
  }

  isStringTrue = s => s == 'true';

  getBooleanValue = s => this.isStringTrue(s) ? true : false;

  isBoolean = val => val == 'true' || val == 'false';

  getValueField = (val) => this.isBoolean(val) ? this.getBooleanValue(val) : val;

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
    this.controlService.saveOne({
      id: this.control.id,
      conditions: this.conditionsConfiguration.value
    }).subscribe(resp => {
      this.control = resp;
      this.conditionsConfiguration.markAsPristine();
    });
  }

  saveActionsConfiguration() {
    console.log(this.actionsConfiguration.value);
    this.controlService.saveOne({
      id: this.control.id,
      actions: this.actionsConfiguration.value
    }).subscribe(resp => {
      this.control = resp;
      this.actionsConfiguration.markAsPristine();
    });
  }

  retrieveDeviceList() {
    this.devicesService.findMany().subscribe(devices => {
        this.devices = devices;
    });
  }

  runChangeDetection () {
    this.ref.markForCheck();
  }

}
