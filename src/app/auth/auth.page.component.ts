import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@core/components/navbar/navbar.component';

@Component({
  selector: 'app-page',
  imports: [RouterOutlet, NavbarComponent],
  template: ` 
  <app-navbar/>
  <router-outlet /> `,
})
export class AuthPageComponent {}
