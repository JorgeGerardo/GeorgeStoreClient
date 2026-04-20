import { Component, inject, OnInit } from '@angular/core';
import { Address } from '@profile/interfaces/address';
import { ProfileService } from '@profile/services/profile.service';
import { AddressComponent } from '@profile/components/address/address.component';
import { NoAddressRegisteredComponent } from '@profile/components/no-address-registered/no-address-registered.component';

@Component({
  selector: 'app-address-list',
  imports: [AddressComponent, NoAddressRegisteredComponent],
  templateUrl: './address-list.component.html',
})
export class AddressListComponent implements OnInit {
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
