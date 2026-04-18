import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '@auth/services/auth.service';
import { RegisterRequest } from '@auth/interfaces/register.request';
import { passwordMatchValidator } from '@core/validators/confirm.password';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, NgbAlertModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  authSrv = inject(AuthService);
  error: string | null = null;

  form = this.fb.nonNullable.group({
    userName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  },
  { validators: passwordMatchValidator }
  );

  public login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    this.authSrv.register(this.form.value as RegisterRequest).subscribe();
  }
}
