import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register({ name: this.name, email: this.email, password: this.password, password_confirmation: this.password_confirmation }).subscribe(
      () => {
        this.router.navigate(['/login']); // Redirigez vers la page de connexion après l'inscription
      },
      (error) => {
        this.errorMessage = 'Erreur lors de l’inscription.';
      }
    );
  }
}
