import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressCreateDto } from '@profile/interfaces/address';
import { AddressService } from '@profile/services/address.service';

@Component({
  selector: 'app-create-address',
  imports: [ReactiveFormsModule],
  templateUrl: './create-address.component.html',
})
export class CreateAddressComponent {
  addressService = inject(AddressService);
  fb = inject(FormBuilder);
  router = inject(Router);

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
      .Add(this.form.value as AddressCreateDto)
      .subscribe((v) => {
        if (v) this.router.navigate(['profile', 'address']);
      });
  }
}
