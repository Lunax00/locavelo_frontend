import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-bike-details',
  templateUrl: './bike-details.component.html',
  styleUrls: ['./bike-details.component.css'],
})
export class BikeDetailsComponent implements OnInit {
  bike: any = {};
  stations: any[] = [];
  reservation = {
    startDate: '',
    endDate: '',
    endStation: '',
  };

  constructor(
    private route: ActivatedRoute,
    private service: ServicesService
  ) {}

  ngOnInit(): void {
    const bikeId = this.route.snapshot.params['id'];
    this.fetchBikeDetails(bikeId);
    this.fetchStations();
  }

  fetchBikeDetails(bikeId: number) {
    this.service.getBike(bikeId).subscribe((data: any) => {
      this.bike = data;
    });
  }

  fetchStations() {
    this.service.getStations().subscribe((data: any) => {
      this.stations = data;
    });
  }

  confirmReservation() {
    const reservationData = {
      bike_id: this.bike.id,
      start_date: this.reservation.startDate,
      end_date: this.reservation.endDate,
      end_station_id: this.reservation.endStation,
    };

    this.service.reserveBike(reservationData).subscribe(() => {
      alert('Réservation confirmée !');
    });
  }
}
