import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@core/components/footer/footer.component';
import { SpinnerComponent } from '@core/components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent, FooterComponent],
  template: `
    <main class="app-layout">
      <section class="app-content">
        <router-outlet />
      </section>

      <app-footer />
      <app-spinner />
    </main>
  `,
  styles: `
    .app-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-content {
      flex: 1;
    }
  `,
})
export class AppComponent {}
