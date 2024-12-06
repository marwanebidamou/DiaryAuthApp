import { Component, inject, Input, signal } from '@angular/core';
import { AbstractControl, FormBuilder, MinLengthValidator, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignUpRequestDTO } from '../../models/auth.dtos';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  imports: [MatCard, MatCardTitle, MatCardContent, MatFormField, MatButton, MatLabel, MatError, MatInputModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  error = signal('');
  authService = inject(AuthService);
  router = inject(Router);

  form = inject(FormBuilder).group({
    email: ['', [Validators.required, this.emailValidator()]],
    fullname: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(10)]],
    confirmPassword: ['', [Validators.required, this.confirmPasswordValidator()]],
  });

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!control.value) {
        return null; // allow empty values
      }
      const isValid = emailRegex.test(control.value);
      return isValid ? null : { 'invalidEmail': true };
    };
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null; // allow empty values
      }
      const isValid = control.value === this.password.value;
      console.log('confirmPasswordValidator', isValid);
      return isValid ? null : { 'notidentical': true };
    };
  }

  get email() { return this.form.controls.email };
  get fullname() { return this.form.controls.fullname };
  get password() { return this.form.controls.password };
  get confirmPassword() { return this.form.controls.confirmPassword };

  onSubmit() {

    const data: SignUpRequestDTO = {
      email: this.email.value!,
      password: this.password.value!,
      fullname: this.fullname.value!
    };

    this.authService.signup(data).subscribe({
      next: () => this.router.navigate(['/diary']),
      error: (e) => {
        if (e.status == 'EmailAlreadyInUse')
          this.error.set('Email already registred, try to login instead!');
        else
          this.error.set('An error occured, please try again!');
      },
    });
  }
}
