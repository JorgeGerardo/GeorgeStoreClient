import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
  <main class="container vh-100 d-flex align-items-center justify-content-center">
    <section class="text-center">

      <h1 class="display-1 fw-bold text-primary">404</h1>

      <h3 class="mb-3">Page not found</h3>

      <p class="text-muted mb-4">
        Try another page.
      </p>

      <a routerLink="/" class="btn btn-primary btn-lg px-4">
        Go home
      </a>

    </section>
  </main>  `,
  styles: ``
})
export class NotFoundComponent {

}
