import { Component, inject, input, output } from '@angular/core';
import { Address } from '@profile/interfaces/address';
import { ProfileService } from '@profile/services/profile.service';

@Component({
  selector: 'app-address',
  imports: [],
  templateUrl: './address.component.html',
})
export class AddressComponent {
  address = input.required<Address>()
  deletedEvent = output<number>();

  addressService = inject(ProfileService);

  delete(addressId: number){
    this.deletedEvent.emit(addressId);
  }
}
