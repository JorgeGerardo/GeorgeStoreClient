import { Component, inject, OnInit } from '@angular/core';
import { Address } from '@profile/interfaces/address';
import { AddressComponent } from '@profile/components/address/address.component';
import { NoAddressRegisteredComponent } from '@profile/components/no-address-registered/no-address-registered.component';
import { RouterLink } from '@angular/router';
import { AddressService } from '@profile/services/address.service';

@Component({
  selector: 'app-address-list',
  imports: [AddressComponent, NoAddressRegisteredComponent, RouterLink],
  templateUrl: './address-list.component.html',
})
export class AddressListComponent implements OnInit {
  addressService = inject(AddressService);
  addresses: Address[] = [];

  ngOnInit() { this.loadAddress(); }

  setAsDefault(addressId: number) {
    this.addressService.SetAsDefault(addressId).subscribe((res) => {
      if (res) this.loadAddress();
    });
  }

  loadAddress() {
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
