import { Component, inject, input, OnInit, output } from '@angular/core';
import { Address } from '@profile/interfaces/address';
import { Router } from "@angular/router";

@Component({
  selector: 'app-address-selection',
  imports: [],
  templateUrl: './address-selection.component.html',
  styleUrl: './address-selection.component.scss'
})
export class AddressSelectionComponent implements OnInit {
  private router = inject(Router);
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

  goToCreate(){
    this.router.navigate(['/','profile', 'address', 'create'], {
      queryParams: { returnUrl: this.router.url }
    });
  }


}
