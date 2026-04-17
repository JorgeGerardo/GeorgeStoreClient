import { Component } from '@angular/core';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-page',
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar />
    <router-outlet />
  `,
  styles: ``,
})
export class ProductPageComponent {}
