import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DevicesService } from '../../services/devices.service';
import * as Chart from 'chart.js';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    templateUrl: 'device.component.html',
})
export class DeviceComponent {

  constructor(
    private route: ActivatedRoute,
    private formBuilder : FormBuilder,
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
  deviceForm : FormGroup;

  ngOnInit() {
    this.deviceForm = this.formBuilder.group({
      automatedControls: this.formBuilder.array([]),
    });
  }

  get automatedControls() {
    return this.deviceForm.get('automatedControls') as FormArray;
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      const ID = params['id'];

      this.devicesService.findOne(ID).subscribe(resp => {
        this.device = resp;
        this.device.controls?.forEach(ac => {
          this.automatedControls.push(this.formBuilder.group({
            condition: [ac.condition],
            action: [ac.action],
            threshhold: [ac.threshhold],
          }));
        });

        this.route.data.subscribe(data => {
          data.title = resp['name'];
        });

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

  addControl() {
    this.automatedControls.push(this.formBuilder.group({
      condition: ['Temperature above'],
      action: ['Switch off'],
      threshhold: ['20'],
    }));
    this.deviceForm.markAsDirty();
  }

  removeControl(index) {
    this.automatedControls.removeAt(index);
    this.deviceForm.markAsDirty();
  }

  save() {
    this.devicesService.saveOne({
      id: this.device.id,
      controls: this.automatedControls.value,
    }).subscribe(resp => {
      console.log(resp);
      this.device = resp;
      this.automatedControls.markAsPristine();
    });
  }

}
