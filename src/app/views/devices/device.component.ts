import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DevicesService } from '../../services/devices.service';
import { GroupsService  } from '../../services/groups.service';
import * as Chart from 'chart.js';
import * as ramda from 'ramda';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    templateUrl: 'device.component.html',
})
export class DeviceComponent {

  constructor(
    private route: ActivatedRoute,
    private formBuilder : FormBuilder,
    private groupsService: GroupsService,
    private devicesService: DevicesService,
  ) {

  }

  @ViewChild('chartRef')
  private chartRef: ElementRef;
  private chart: Chart;
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
        this.device.telemetry?.forEach(t => {
          this.telemetryConfiguration.push(this.formBuilder.group({
            name: [t.name],
            path: [t.path],
          }));
        });

        this.device.settings?.forEach(s => {
          this.settingsConfiguration.push(this.formBuilder.group({
            name: [s.name],
            path: [s.path],
          }));
        });

        this.route.data.subscribe(data => {
          data.title = resp['name'];
        });

        const GROUP_ID = ramda.path(['id'], this.device);
        this.groupsService.findOne(GROUP_ID).subscribe(group => {
          this.group = group;
        })

        if (this.device.data) {
          this.chart = new Chart(this.chartRef.nativeElement, {
            type: 'line',
            options: this.lineChartOptions,
            
            data: {
              labels: this.device.data?.map(d => d.received),
              datasets: [{
                  data: this.device.data.map(d => d.temp),
                  label: 'Temperature',
                  borderColor: '#2c5dc7',
                  backgroundColor: 'rgba(147, 170, 219, 0.1)'
              }]
            }
          });
        }
      });
    });
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
      path: ['new path'],
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
      this.settingsConfiguration.markAsPristine();
    });
  }
}
