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
  selectedValue: number | null = null;
  addresses = input.required<Address[]>();
  selectedEvent = output<number>();
  isMenuOpen = true;

  ngOnInit() {
    let defaultAddress = this.addresses().find(a => a.isDefault)
    if(!defaultAddress)
      return;

    this.selectedEvent.emit(defaultAddress.id);
    this.selectedValue = defaultAddress.id;
    this.isMenuOpen = false;
  }

  selectPaymentMethod(id: number) {
    this.selectedValue = id;
    this.isMenuOpen = false;
    this.selectedEvent.emit(id);
  }

  get selectedAddress() {
    return this.addresses().find(a => a.id === this.selectedValue);
  }

}
