import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProjectsService } from '../../services/projects.service';

@Component({
    templateUrl: 'create.component.html',
})
export class CreateProjectComponent {

  constructor(
    private projectsService: ProjectsService,
    private router: Router
  ) { }

  projectForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  
  onSubmit() {

    if (this.projectForm.invalid) {
      return;
    }
    
    this.projectsService.saveOne({
      ...this.projectForm.value,
    }).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['projects']);
    });
    
  }

  cancel() {
    this.router.navigate(['projects']);
  }

}
