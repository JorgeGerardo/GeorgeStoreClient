import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '@auth/services/auth.service';
import { RegisterRequest } from '@auth/interfaces/register.request';
import { passwordMatchValidator } from '@core/validators/confirm.password';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, NgbAlertModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authSrv = inject(AuthService);
  private router = inject(Router);
  error: string | null = null;

  form = this.fb.nonNullable.group({
    userName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  },
  { validators: passwordMatchValidator }
  );

  public register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    this.authSrv.register(this.form.value as RegisterRequest).pipe(
      tap(() => this.router.navigate(['/auth/login'])),
      catchError((err:HttpErrorResponse) => {
        this.error = err.status === 429
          ? 'You only can register 1 user in some range of time, try again later (Rate limit detected)'
          : err.error?.message || 'Error, try again later';


        return throwError(() => err);
      })
    ).subscribe();
  }
}
