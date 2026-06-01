import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@core/components/footer/footer.component';
import { SpinnerComponent } from "@core/components/spinner/spinner.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent, FooterComponent],
  template: `
    <router-outlet/>
    <app-footer/>
    <app-spinner>
  `,
})
export class AppComponent {}
