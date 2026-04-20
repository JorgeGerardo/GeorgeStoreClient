import { Component, inject, OnInit } from '@angular/core';
import { Address } from '@profile/interfaces/address';
import { ProfileService } from '@profile/services/profile.service';
import { AddressComponent } from '../address/address.component';
import { NoAddressRegisteredComponent } from '../no-address-registered/no-address-registered.component';

@Component({
  selector: 'app-directions',
  imports: [AddressComponent, NoAddressRegisteredComponent],
  templateUrl: './addresses.component.html',
})
export class AddressesComponent implements OnInit {
  addressService = inject(ProfileService);
  addresses: Address[] = [];

  ngOnInit() {
    this.addressService.Get().subscribe((res) => (this.addresses = res));
  }

  remove(addressId: number) {
    this.addressService
      .Delete(addressId)
      .subscribe(
        () =>
          (this.addresses = this.addresses.filter((a) => a.id != addressId)),
      );
  }
}
