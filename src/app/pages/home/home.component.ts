import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  stations: any[] = [];

  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    this.fetchStations();
  }

  fetchStations() {
    this.service.getStations().subscribe((data: any) => {
      this.stations = data.map((station: any) => ({
        ...station,
        bikeCount: station.bikes ? station.bikes.length : 0,
      }));
    });
  }

  selectStation(station: any) {
    // Rediriger vers une page pour voir les vélos disponibles
    window.location.href = `/station/${station.id}`;
  }
}
