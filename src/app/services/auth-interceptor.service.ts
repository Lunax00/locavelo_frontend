import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Récupérer le token depuis localStorage
        const token = localStorage.getItem('auth_token');

        // Vérifier si le token existe
        if (token) {
            // Cloner la requête et y ajouter le header Authorization
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        // Passer la requête au prochain handler (backend ou autre intercepteur)
        return next.handle(req);
    }
}
