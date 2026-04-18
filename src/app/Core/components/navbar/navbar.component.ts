import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '@auth/services/token.service';
import { CartService } from '@cart/services/cart.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { toObservable } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, NgbCollapseModule, RouterLinkActive],
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">

    <a class="navbar-brand fw-bold" routerLink="/home" (click)="close()">
      GeorgeStore
    </a>

    <!-- Burger btn -->
    <button 
      class="navbar-toggler" 
      type="button"
      (click)="toggle()">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Menú -->
    <div 
      [ngbCollapse]="!isMenuOpen" 
      class="collapse navbar-collapse">

      <ul class="navbar-nav ms-auto text-center text-lg-start">

        <li class="nav-item mt-2 mt-lg-0">
          <a 
            class="nav-link btn btn-outline-primary ms-lg-2"
            routerLink="/home" 
            (click)="close()"
            routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true}">
            Home
          </a>
        </li>

        @if (!isLogged()) {
          <li class="nav-item">
            <a 
              class="nav-link btn btn-outline-primary ms-lg-2" 
              routerLink="/auth/login" 
              (click)="close()"
              routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true}">
              Sign in
            </a>
          </li>

          <li class="nav-item">
            <a 
              class="nav-link btn btn-outline-primary ms-lg-2 mt-2 mt-lg-0 px-3"
              routerLink="/auth/register"
              (click)="close()"
              routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true}">
              Register
            </a>
          </li>
        }
        @else {
          
          <li class="nav-item">
            <a 
              class="nav-link btn btn-outline-danger ms-lg-2 mt-2 mt-lg-0 px-3"
              (click)="this.tokenService.logout()">
              Logout
            </a>
          </li>


          <li class="nav-item">
            <a
              class="nav-link ms-lg-2"
              routerLink="/profile"
              (click)="close()"
              routerLinkActive="active">

              <i class="bi bi-person-circle fs-5"></i>

            </a>
          </li>

          <li class="nav-item">
            <a 
              class="nav-link position-relative ms-lg-2 d-inline-flex align-items-center justify-content-center"
              routerLink="/cart"
              (click)="close()"
              routerLinkActive="active">
              <i class="bi bi-cart3 fs-5"></i>

              <span *ngIf="itemsCount()"
                class="position-absolute badge rounded-pill bg-danger"
                style="top: -2px; right: -8px; font-size: 0.6rem;">
                {{ itemsCount() }}
              </span>
              
            </a>
          </li>

        }


      </ul>
    </div>

  </nav>
  `,
})
export class NavbarComponent {
  isMenuOpen = false;
  tokenService = inject(TokenService);
  cartService = inject(CartService);
  isLogged = this.tokenService.isLogged;
  itemsCount = toSignal<number | undefined>(
    toObservable(this.isLogged).pipe(
      switchMap(isLogged => isLogged ? this.cartService.GetCount() : of(undefined))
    ),
    { initialValue: undefined}
  );

  toggle() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  close() {
    this.isMenuOpen = false;
  }
}
