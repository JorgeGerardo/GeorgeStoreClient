import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressCreateDto } from '@profile/interfaces/address';
import { ProfileService } from '@profile/services/profile.service';

@Component({
  selector: 'app-create-address',
  imports: [ReactiveFormsModule],
  templateUrl: './create-address.component.html',
})
export class CreateAddressComponent {
  profileService = inject(ProfileService);
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
  });

  register() {
    this.profileService
      .Add(this.form.value as AddressCreateDto)
      .subscribe((v) => {
        if (v) this.router.navigate(['profile', 'address']);
      });
  }
}
