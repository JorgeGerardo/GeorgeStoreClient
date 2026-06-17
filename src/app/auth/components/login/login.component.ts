
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '@auth/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import LoginRequest from '@auth/interfaces/LoginRequest';
import { EmailValidator } from '@core/validators/email-validator';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgbAlertModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private authSrv = inject(AuthService);
  private router = inject(Router);

  error: string | null = null;

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, EmailValidator]],
    password: ['', [Validators.required]],
  });

  public login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authSrv.login(this.form.value as LoginRequest).subscribe(result => {
      if(result){
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl)
      }
    });


  }

}
