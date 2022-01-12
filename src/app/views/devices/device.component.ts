import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import * as Chart from 'chart.js';
import * as ramda from 'ramda';

import { DevicesService } from '../../services/devices.service';
import { GroupsService  } from '../../services/groups.service';

@Component({
    templateUrl: 'device.component.html',
})
export class DeviceComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder : FormBuilder,
    private groupsService: GroupsService,
    private devicesService: DevicesService,
  ) {
  }

  public lineChartType = 'line';
  public lineChartOptions: any = {
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true,
          },
          ticks: {
            callback: function(val, index) {
              return `${val.split('T')[1].split('.')[0]}`
            },  
          }
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
          }
        }
      ]
    },
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: false
    },
    legend: {
      display: false
    },
  };

  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: "#fffff",
      pointBackgroundColor: '#ff0303',
      pointBorderColor: '#32a85c',
      pointHoverBackgroundColor: '#32a85c',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ]

  private device:any = {};
  private group:any = {};
  deviceForm : FormGroup;

  ngOnInit() {
    this.deviceForm = this.formBuilder.group({
      telemetryConfiguration: this.formBuilder.array([]),
      settingsConfiguration: this.formBuilder.array([]),
    });
  }

  get telemetryConfiguration() {
    return this.deviceForm.get('telemetryConfiguration') as FormArray;
  }

  get settingsConfiguration() {
    return this.deviceForm.get('settingsConfiguration') as FormArray;
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      const ID = params['id'];

      this.devicesService.findOne(ID).subscribe(resp => {
        this.device = resp;
        this.refreshTelemetryConfigurationPanel();
        this.refreshSettingsConfigurationPanel();

        this.route.data.subscribe(data => {
          data.title = resp['name'];
        });

        const GROUP_ID = ramda.path(['group_id'], this.device);
        this.groupsService.findOne(GROUP_ID).subscribe(group => {
          this.group = group;
        });

        this.extractDeviceTelemetry();
      });
    });
  }

  refreshTelemetryConfigurationPanel(){
    this.device.telemetry?.forEach(t => {
      this.telemetryConfiguration.push(this.formBuilder.group({
        name: [t.name],
        path: [t.path],
      }));
    });
  }

  refreshSettingsConfigurationPanel() {
    this.device.settings?.forEach(s => {
      this.settingsConfiguration.push(this.formBuilder.group({
        name: [s.name],
        type: [s.type],
        path: [s.path],
        value: [s.value],
      }));
    });

    console.log(this.settingsConfiguration);
  }

  addTelemetry() {
    this.telemetryConfiguration.push(this.formBuilder.group({
      name: ['new name'],
      path: ['new path'],
    }));
    this.telemetryConfiguration.markAsDirty();
  }

  removeTelemetry(index) {
    this.telemetryConfiguration.removeAt(index);
    this.telemetryConfiguration.markAsDirty();
  }

  addSetting() {
    this.settingsConfiguration.push(this.formBuilder.group({
      name: ['new name'],
      type: ['switch'],
      path: ['new path'],
      value: ['new value'],
    }));
    this.settingsConfiguration.markAsDirty();
  }

  removeSetting(index) {
    this.settingsConfiguration.removeAt(index);
    this.settingsConfiguration.markAsDirty();
  }

  saveTelemetryConfiguration() {
    this.devicesService.saveOne({
      id: this.device.id,
      telemetry: this.telemetryConfiguration.value
    }).subscribe(resp => {
      console.log(resp);
      this.device = resp;
      this.extractDeviceTelemetry();
      this.telemetryConfiguration.markAsPristine();
    });
  }

  saveSettingsConfiguration() {
    this.devicesService.saveOne({
      id: this.device.id,
      settings: this.settingsConfiguration.value
    }).subscribe(resp => {
      console.log(resp);
      this.device = resp;
      this.extractDeviceTelemetry();
      this.settingsConfiguration.markAsPristine();
    });
  }

  viewGroup($id) {
    this.router.navigate(['groups', 'view', $id]);
  }

  extractedTelemetry:any = {};

  extractDeviceTelemetry() {
    this.device.telemetry?.forEach(_t => {
      this.extractedTelemetry[_t.path] = {
        labels: [],
        data: []
      };
    });

    this.device.data?.forEach(_d => {
      
      for (let key in _d) {
        if (this.extractedTelemetry[key] != undefined) {
          this.extractedTelemetry[key].labels.push(_d['received']);
          this.extractedTelemetry[key].data.push(_d[key]);
        }
      }
    });
  }
}
