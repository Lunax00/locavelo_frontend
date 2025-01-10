import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        localStorage.setItem('access_token', response.access_token);
        this.router.navigate(['/profile']);
      },
      (error) => {
        this.errorMessage = 'Invalid credentials.';
      }
    );
  }
}
