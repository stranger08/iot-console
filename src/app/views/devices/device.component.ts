import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { DevicesService } from '../../services/devices.service';
import * as Chart from 'chart.js';

@Component({
    templateUrl: 'device.component.html',
})
export class DeviceComponent {

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
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
            color: '#dfe3e6',
            zeroLineColor: '#dfe3e6'
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
            color: '#dfe3e6',
            zeroLineColor: '#dfe3e6'
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

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      const ID = params['id'];

      this.devicesService.findOne(ID).subscribe(resp => {
        this.device = resp;

        this.route.data.subscribe(data => {
          data.title = resp['name'];
        });
        console.log(this.device.data.map(d => {return {x: d.received, y: d.temp}}));

        this.chart = new Chart(this.chartRef.nativeElement, {
          type: 'line',
          options: this.lineChartOptions,
          
          data: {
            labels: this.device.data.map(d => d.received),
            datasets: [
            {data: this.device.data.map(d => d.temp), label: 'Temperature'},
          ]}
        });
      });
    });
  }

}
