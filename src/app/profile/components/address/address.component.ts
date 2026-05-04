import { Component, inject, input, output } from '@angular/core';
import { Address } from '@profile/interfaces/address';
import { ProfileService } from '@profile/services/profile.service';

@Component({
  selector: 'app-address',
  imports: [],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
  private addressService = inject(ProfileService);
  
  address = input.required<Address>()
  deletedEvent = output<number>();
  setDefaultEvent = output<number>();

  delete(addressId: number){
    this.deletedEvent.emit(addressId);
  }
}
