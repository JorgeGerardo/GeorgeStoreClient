import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-no-address-registered',
  imports: [CommonModule, RouterLink],
  template: `
  <section class="d-flex flex-column align-items-center justify-content-center text-center py-5">
    <i class="bi bi-geo-alt display-4 text-muted mb-3"></i>
    <h4 class="fw-bold mb-2">You have no registered addresses</h4>
    <p class="text-muted mb-4">
      Add an address to place orders faster.
    </p>

    <a 
      routerLink="/profile/address/create"
      class="btn btn-primary px-4 d-flex align-items-center gap-2">
      <i class="bi bi-plus-lg"></i>
        Add address
    </a>

  </section>
  `,
})
export class NoAddressRegisteredComponent {

}
