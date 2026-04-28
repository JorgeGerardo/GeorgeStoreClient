import { Component, input, output } from '@angular/core';
import { Address } from '@profile/interfaces/address';

@Component({
  selector: 'app-address-selection',
  imports: [],
  templateUrl: './address-selection.component.html',
  styleUrl: './address-selection.component.scss'
})
export class AddressSelectionComponent {
  selectedAddressId: number | null = null;
  addresses = input.required<Address[]>();
  selectEvent = output<number>();
  isAddressOpen = true;

  selectPaymentMethod(id: number) {
    this.selectedAddressId = id;
    this.isAddressOpen = false;
    this.selectEvent.emit(id);
  }

  get selectedAddress() {
    return this.addresses().find(a => a.id === this.selectedAddressId);
  }

}
