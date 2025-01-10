import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/backend.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent implements OnInit {
  reservations: any[] = [];
  filters = {
    email: '',
    startDate: '',
    endDate: '',
    startStation: '',
    endStation: '',
  };
  applyFilters(): void {
    this.service.getReservations().subscribe({
      next: (data) => {
        this.reservations = data.filter((reservation) => {
          // Filtrer par email
          const emailMatch =
            this.filters.email === '' ||
            reservation.user.email
              .toLowerCase()
              .includes(this.filters.email.toLowerCase());
  
          // Filtrer par date de départ
          const startDateMatch =
            this.filters.startDate === '' ||
            new Date(reservation.reservation_time) >=
              new Date(this.filters.startDate);
  
          // Filtrer par date d'arrivée
          const endDateMatch =
            this.filters.endDate === '' ||
            (reservation.return_time &&
              new Date(reservation.return_time) <= new Date(this.filters.endDate));
  
          // Filtrer par station de départ
          const startStationMatch =
            this.filters.startStation === '' ||
            (reservation.start_station &&
              reservation.start_station.name
                .toLowerCase()
                .includes(this.filters.startStation.toLowerCase()));
  
          // Filtrer par station d'arrivée
          const endStationMatch =
            this.filters.endStation === '' ||
            (reservation.end_station &&
              reservation.end_station.name
                .toLowerCase()
                .includes(this.filters.endStation.toLowerCase()));
  
          return (
            emailMatch &&
            startDateMatch &&
            endDateMatch &&
            startStationMatch &&
            endStationMatch
          );
        });
      },
      error: (err) => {
        console.error('Erreur lors de l’application des filtres :', err);
      },
    });
  }
  
  resetFilters(): void {
    this.filters = {
      email: '',
      startDate: '',
      endDate: '',
      startStation: '',
      endStation: '',
    };
    this.fetchReservations(); // Recharge toutes les réservations
  }
  

  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.service.getReservations().subscribe({
      next: (data) => {
        this.reservations = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des réservations :', err);
      },
    });
  }
}
