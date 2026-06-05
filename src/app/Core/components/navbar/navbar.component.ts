
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '@auth/services/token.service';
import { CartService } from '@cart/services/cart.service';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgbCollapseModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: 'navbar.component.scss'
})
export class NavbarComponent {
  private tokenService = inject(TokenService);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  isLogged = this.tokenService.isLogged;
  itemsCount = this.cartService.count;
  isMenuOpen = false;

  toggle() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  close() {
    this.isMenuOpen = false;
  }

  logout(){
    this.authService.logout().subscribe()
  }
}
