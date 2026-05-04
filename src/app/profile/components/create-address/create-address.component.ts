import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressCreateDto } from '@profile/interfaces/address';
import { AddressService } from '@profile/services/address.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-create-address',
  imports: [ReactiveFormsModule],
  templateUrl: './create-address.component.html',
})
export class CreateAddressComponent {
  addressService = inject(AddressService);
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);

  form = this.fb.nonNullable.group({
    alias: ['', [Validators.required]],
    street: ['', [Validators.required]],
    neighborhood: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
    externalNumber: [''],
    internalNumber: [''],
    references: [''],
    isDefault: [false],
  });

  register() {
    this.addressService
      .Add(this.form.value as AddressCreateDto).pipe(
        tap(() => this.handleNavigation())
      ).subscribe();
  }

  private handleNavigation() {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.router.navigateByUrl(
      returnUrl ?? '/profile/address'
    );
  }

}
