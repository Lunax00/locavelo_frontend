import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        localStorage.setItem('access_token', response.access_token);
        this.router.navigate(['/']); // Redirigez vers une autre page après la connexion
      },
      (error) => {
        this.errorMessage = 'Échec de la connexion. Vérifiez vos informations.';
      }
    );
  }
}
