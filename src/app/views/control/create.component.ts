import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ControlService } from '../../services/control.service';

@Component({
    templateUrl: 'create.component.html',
})
export class CreateControlComponent {

  constructor(
    private controlService: ControlService,
    private router: Router
  ) { }

  controlForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  
  onSubmit() {

    if (this.controlForm.invalid) {
      return;
    }
    
    this.controlService.saveOne({
      ...this.controlForm.value,
    }).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['controls']);
    });
    
  }

  cancel() {
    this.router.navigate(['controls']);
  }

}
