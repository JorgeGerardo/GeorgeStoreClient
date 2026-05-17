import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { ApiError } from '@core/Interfaces/api-error';
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-forgot-password',
  imports: [NgbAlert, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  error: string | null = null;
  success: string | null = null;
  loading = false;

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  send() {
    if (this.form.invalid) return;

    this.error = null;
    this.success = null;
    this.loading = true;

    this.authService.forgotPassword(this.form.value.email!).subscribe({
      next: () => {
        this.success = 'If the email exists, a recovery link has been sent.';
        this.form.reset();
        this.loading = false;
      },
      error: (err:HttpErrorResponse) => {
        this.error = (err.error as ApiError).detail;
        this.loading = false;
      },
    });
  }
}
