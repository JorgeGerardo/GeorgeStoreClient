import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { NgbAlert } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-reset-password',
  imports: [NgbAlert, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private token = "";

  error: string | null = null;

  form = this.fb.nonNullable.group(
    {
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: (group) => {
        const pass = group.get('password')?.value;
        const confirm = group.get('confirmPassword')?.value;
        return pass === confirm ? null : { mismatch: true };
      }
    }
  );

  constructor() {
    const token:string = this.route.snapshot.queryParams['prt'] ;
    if(token)
      this.token = token
    else this.router.navigate(['/']);
  }

  recover(){
    if(this.form.invalid)
      return;
    
    this.authService.resetPassword({
      newPassowrd: this.form.get("password")?.value!,
      token: this.token
    }).subscribe()
  }
}
