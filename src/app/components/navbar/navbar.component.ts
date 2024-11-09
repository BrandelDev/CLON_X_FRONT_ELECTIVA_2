import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/infrastructure/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  authService = inject(AuthService);

  logOut() { 
    this.authService.logout()
  }
}
