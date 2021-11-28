import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

import { UsersService } from '../../services/users.service';

function ConfirmedValidator(controlName: string, matchingControlName: string) : ValidatorFn  {
  return (formGroup: FormGroup) : ValidationErrors => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  constructor(
    private usersService: UsersService
  ) { 
    
  }

  completed = false;
  error = false;
  errorMessage = '';

  showError(message) { 
    this.error = true;
    this.errorMessage = message;
  }

  hideError() {
    this.error = false;
    this.errorMessage = '';
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    passwordOrigin: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', [Validators.required]),
  }, [ConfirmedValidator('passwordOrigin', 'passwordRepeat')]);


  onSubmit() {
    
    if (this.form.invalid) {
      return;
    }

    this.usersService.register(this.email.value, this.passwordOrigin.value)
      .subscribe(resp => {
        if (resp['status'] && resp['status'] == 'USER_EXISTS') {
          this.error = true;
        } else {
          this.completed = true;
        }
      }
    );
    
  }


  get email() {
    return this.form.get('email');
  }

  get passwordOrigin() {
    return this.form.get('passwordOrigin');
  }

  get passwordRepeat() {
    return this.form.get('passwordRepeat');
  }

}
