import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private baseURL = 'http://127.0.0.1:8000/api'; // Base URL de l'API Laravel

  constructor(private http: HttpClient) {}

  // Stations
  getStations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/stations`);
  }
  
  addStation(data: FormData) {
    return this.http.post('http://127.0.0.1:8000/api/stations', data);
  }
  
  updateStation(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseURL}/station/${id}`, data);
  }
  
  deleteStation(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/station/${id}`);
  }
  

  // Vélos
  getBikes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/bikes`);
  }
  
  addBike(bike: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/bikes`, bike);
  }
  
  updateBike(bike: any): Observable<any> {
    return this.http.put<any>(`${this.baseURL}/bikes/${bike.id}`, bike);
  }
  
  deleteBike(bikeId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/bikes/${bikeId}`);
  }
  

  // Types de vélos
  private typeVelosURL = `${this.baseURL}/type-velos`;

  getTypeVelos(): Observable<any[]> {
    return this.http.get<any[]>(this.typeVelosURL);
  }

  addTypeVelo(data: any): Observable<any> {
    return this.http.post<any>(this.typeVelosURL, data);
  }

  updateTypeVelo(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.typeVelosURL}/${id}`, data);
  }

  deleteTypeVelo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.typeVelosURL}/${id}`);
  }

  // Réservations
  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/reservations/history`);
  }
  
  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/reservations/history/${id}`);
  }
  
  filterReservations(filters: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseURL}/reservations/history/filter`, filters);
  }
  
  

  // Utilisateurs
  // Modifier les crédits
  updateUserCredits(userId: number, credits: number): Observable<any> {
    return this.http.post(`${this.baseURL}/users/${userId}/update-credits`, { credits });
  }

  // Supprimer un utilisateur
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/users/${userId}`);
  }
  updateUserStatus(userId: number, status: string): Observable<any> {
    return this.http.post(`${this.baseURL}/users/${userId}/toggle-status`, { status });
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/users`);
  }
  
  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseURL}/users/${id}`, data);
  }
  
  
  toggleStatus(id: number): Observable<any> {
    return this.http.post(`${this.baseURL}/users/${id}/toggle-status`, {});
  }
  //HOME
  // Récupérer les détails d'une station
  getStation(stationId: number): Observable<any> {
    const url = `${this.baseURL}/station/${stationId}`;
    return this.http.get<any>(url);
  }

  // Récupérer les détails d'un vélo
  getBike(bikeId: number): Observable<any> {
    const url = `${this.baseURL}/bike/${bikeId}`;
    return this.http.get<any>(url);
  }

  // Réserver un vélo
  reserveBike(data: any): Observable<any> {
    const url = `${this.baseURL}/reservations`;
    return this.http.post<any>(url, data);
  }
  
}