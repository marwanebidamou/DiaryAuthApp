import { Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginRequestDTO } from '../../models/auth.dtos';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatCard, MatCardTitle, MatCardContent, MatFormField, MatButton, MatLabel, MatError, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  error = signal('');
  authService = inject(AuthService);
  router = inject(Router);

  form = inject(FormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],

  });

  get email() { return this.form.controls.email };
  get password() { return this.form.controls.password };

  onSubmit() {

    const data: LoginRequestDTO = { email: this.email.value!, password: this.password.value! };

    this.authService.login(data).subscribe({
      next: () => this.router.navigate(['/diary']),
      error: () => (this.error.set('Invalid email or password')),
    });
  }
}
