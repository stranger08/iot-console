import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../services/users.service';

@Component({
    templateUrl: 'create.component.html',
})
export class CreateUserComponent {

  constructor(
    private router: Router,
    private usersService: UsersService
  ) { }

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });
  
  onSubmit() {

    if (this.userForm.invalid) {
      return;
    }

    console.log(this.userForm.value);
    
    this.usersService.saveOne({
      ...this.userForm.value,
      registered: new Date(),
      status: "Active",
    }).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['users']);
    });
    
  }

  cancel() {
    this.router.navigate(['users']);
  }

}
