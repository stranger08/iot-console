import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GroupsService } from '../../services/groups.service';

@Component({
    templateUrl: 'create.component.html',
})
export class CreateGroupComponent {

  constructor(
    private groupsService: GroupsService,
    private router: Router
  ) { }

  groupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  
  onSubmit() {

    if (this.groupForm.invalid) {
      return;
    }
    
    this.groupsService.saveOne({
      ...this.groupForm.value,
      registered: new Date(),
    }).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['groups']);
    });
    
  }

  cancel() {
    this.router.navigate(['groups']);
  }

}
