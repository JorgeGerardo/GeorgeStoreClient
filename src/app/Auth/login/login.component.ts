import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../Services/auth.service';
import LoginRequest from '../Interfaces/LoginRequest';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, NgbAlertModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authSrv = inject(AuthService);
  router = inject(Router);

  error: string | null = null;

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authSrv.login(this.form.value as LoginRequest).subscribe(result => {
      if(result)
        this.router.navigate(['/', 'home'])
    });


  }


}
