import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private map: L.Map | undefined;
  private readonly casablancaCoordinates: [number, number] = [33.5731, -7.5898];
  stations: any[] = []; // Pour stocker les données des stations

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initMap();
    this.loadStations();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.casablancaCoordinates,
      zoom: 13
    });

    // Ajouter une couche de tuiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadStations(): void {
    this.http.get<any[]>('http://127.0.0.1:8000/api/stations').subscribe((stations) => {
      this.stations = stations; // Stocker les stations pour d'autres usages
      this.addMarkers(stations);
    });
  }

  private addMarkers(stations: any[]): void {
    stations.forEach((station) => {
      // Convertir les coordonnées en [latitude, longitude]
      const coordinates = station.coordinates.split(',').map(Number);

      // Configuration de l'icône personnalisée
      const icon = L.icon({
        iconUrl: `assets/images/markers/marker${station.id}.png` || 'assets/images/markers/default.png',
        shadowUrl: 'assets/images/markers/shadow.png',
        iconSize: [100, 100],
        shadowSize: [90, 90],
        iconAnchor: [90, 80],
        shadowAnchor: [80, 65],
        popupAnchor: [0, -10]
      });
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© CartoDB',
      }).addTo(this.map!);
      
      
      
      
      
      // Ajouter un marqueur avec l'icône personnalisée
      L.marker(coordinates, { icon })
        .addTo(this.map!)
        .bindPopup(
          `<b>${station.name}</b><br>${station.address}<br>Capacité: ${station.capacity}`
        )
        .on('click', () => {
          console.log(`Station cliquée : ${station.name}`);
        });
    });
  }
}
