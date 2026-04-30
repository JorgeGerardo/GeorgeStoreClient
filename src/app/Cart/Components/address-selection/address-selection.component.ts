import { Component, input, OnInit, output } from '@angular/core';
import { Address } from '@profile/interfaces/address';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-address-selection',
  imports: [RouterLink],
  templateUrl: './address-selection.component.html',
  styleUrl: './address-selection.component.scss'
})
export class AddressSelectionComponent implements OnInit {
  selectedAddressId: number | null = null;
  addresses = input.required<Address[]>();
  selectEvent = output<number>();
  isAddressOpen = true;

  ngOnInit() {
    let defaultAddress = this.addresses().find(a => a.isDefault)
    if(!defaultAddress)
      return;

    this.selectEvent.emit(defaultAddress.id);
    this.selectedAddressId = defaultAddress.id;
    this.isAddressOpen = false;
  }

  selectPaymentMethod(id: number) {
    this.selectedAddressId = id;
    this.isAddressOpen = false;
    this.selectEvent.emit(id);
  }

  get selectedAddress() {
    return this.addresses().find(a => a.id === this.selectedAddressId);
  }

}
