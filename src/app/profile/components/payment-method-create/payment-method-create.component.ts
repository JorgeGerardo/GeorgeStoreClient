import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentMethodCreateDto } from '@profile/interfaces/payment-method-create-dto';
import { PaymentMethodService } from '@profile/services/payment-method.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-payment-method-create',
  imports: [ReactiveFormsModule],
  templateUrl: './payment-method-create.component.html',
  styles: ``
})
export class PaymentMethodCreateComponent {
  private service = inject(PaymentMethodService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
    brand: ['', [Validators.required]],
    expMonth: [0, [Validators.required, Validators.max(12), Validators.min(1)]],
    expYear: [2030, [Validators.required]],
    cardHolderName: ['', [Validators.required]],
    isDefault: [false]
  });

  save() {
    this.service.Add(this.form.value as PaymentMethodCreateDto).pipe(
      tap(() => this.handleNavigation())
    ).subscribe();
  }

  private handleNavigation() {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.router.navigateByUrl(
      returnUrl ?? '/profile/payment-methods'
    );
  }
}
