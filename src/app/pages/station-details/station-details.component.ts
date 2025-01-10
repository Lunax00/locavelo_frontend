import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrls: ['./station-details.component.css'],
})
export class StationDetailsComponent implements OnInit {
  station: any = {};
  availableBikes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: ServicesService
  ) {}

  ngOnInit(): void {
    const stationId = this.route.snapshot.params['id'];
    this.fetchStationDetails(stationId);
  }

  fetchStationDetails(stationId: number) {
    this.service.getStation(stationId).subscribe((data: any) => {
      this.station = data;
      this.availableBikes = data.bikes.filter(
        (bike: any) => bike.state === 'Disponible'
      );
    });
  }

  selectBike(bike: any) {
    // Rediriger vers la page de réservation du vélo
    window.location.href = `/bike/${bike.id}`;
  }
}
