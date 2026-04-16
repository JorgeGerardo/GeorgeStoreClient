import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '../../Auth/Services/token.service';

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

        <li class="nav-item">
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

        }


      </ul>
    </div>

  </nav>
  `,
})
export class NavbarComponent {
  isMenuOpen = false;
  tokenService = inject(TokenService);
  isLogged = this.tokenService.isLogged;
  

  toggle() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  close() {
    this.isMenuOpen = false;
  }
}
