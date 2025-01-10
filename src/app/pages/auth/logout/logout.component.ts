import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('access_token');
      this.router.navigate(['/login']);
    });
  }
}
