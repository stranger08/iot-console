import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { ProjectsService } from '../../services/projects.service';

@Component({
    templateUrl: 'project.component.html',
})
export class ProjectComponent {

  @ViewChild('addUserModal') public addUserModal: ModalDirective;

  constructor(
    private projectService: ProjectsService,
    private route: ActivatedRoute,
  ) {

  }

  project:any = {};

  ngOnInit() {
    this.loadProject();
  }

  loadProject() {
    this.route.params.subscribe(params => {
      const ID = params['id'];

      this.projectService.findOne(ID).subscribe(resp => {
        this.project = resp;

        this.route.data.subscribe(data => {
          data.title = resp['name'];
        });
      });
    });
  }
  

  addUserForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  addUser() {

    if (this.addUserForm.invalid) {
      this.addUserModal.hide();
      return;
    } else {
      const PROJECT_ID = this.project?.id;
      const USER_EMAIL = this.addUserForm.controls?.email?.value;
      this.projectService.addUserToProject(PROJECT_ID, USER_EMAIL)
        .subscribe(resp => {
          this.addUserModal.hide();
          this.loadProject();
        });
    }
  }

  onSubmit(){}

}
