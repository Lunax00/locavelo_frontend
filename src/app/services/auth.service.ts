import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private http: HttpClient) {
    // Charger les informations utilisateur depuis localStorage si elles existent
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.userSubject = new BehaviorSubject<any>(storedUser);
    this.user = this.userSubject.asObservable();
  }

  // Obtenir l'utilisateur actuel (getter)
  public get currentUser(): any {
    return this.userSubject.value;
  }

  // Connexion
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      map((response: any) => {
        // Stocker les informations utilisateur et le token dans localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('access_token', response.access_token);
        this.userSubject.next(response.user);
        return response;
      })
    );
  }

  // Inscription
  register(user: { name: string; email: string; password: string; password_confirmation: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  // Déconnexion
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}).pipe(
      map(() => {
        // Supprimer les informations utilisateur du localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        this.userSubject.next(null);
      })
    );
  }

  // Récupérer les informations utilisateur depuis l'API
  getUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`);
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}