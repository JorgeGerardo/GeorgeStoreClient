import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from "@core/components/spinner/spinner.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent],
  template: `
    <router-outlet/>
    <app-spinner>
  `,
})
export class AppComponent {}
