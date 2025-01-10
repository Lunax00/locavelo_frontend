import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/backend.service';

@Component({
  selector: 'app-velos',
  templateUrl: './velos.component.html',
  styleUrls: ['./velos.component.css'],
})
export class VelosComponent implements OnInit {
  bikes: any[] = [];
  typeVelos: any[] = [];
  stations: any[] = [];
  newBike = {
    type_velo_id: null,
    state: 'Disponible',
    station_id: null,
  };
  message: string = '';

  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    this.fetchBikes();
    this.fetchTypeVelos();
    this.fetchStations();
  }

  fetchBikes(): void {
    this.service.getBikes().subscribe({
      next: (data) => (this.bikes = data),
      error: (err) => console.error('Erreur lors du chargement des vélos :', err),
    });
  }

  fetchTypeVelos(): void {
    this.service.getTypeVelos().subscribe({
      next: (data) => (this.typeVelos = data),
      error: (err) =>
        console.error('Erreur lors du chargement des types de vélos :', err),
    });
  }

  fetchStations(): void {
    this.service.getStations().subscribe({
      next: (data) => (this.stations = data),
      error: (err) =>
        console.error('Erreur lors du chargement des stations :', err),
    });
  }

  addBike(): void {
    this.service.addBike(this.newBike).subscribe({
      next: () => {
        this.fetchBikes();
        this.newBike = {
          type_velo_id: null,
          state: 'Disponible',
          station_id: null,
        };
        this.showMessage('Vélo ajouté avec succès !');
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout du vélo :', err);
        this.showMessage('Erreur lors de l’ajout du vélo.');
      },
    });
  }

  updateBike(bike: any): void {
    this.service.updateBike(bike).subscribe({
      next: () => this.showMessage('Vélo mis à jour avec succès !'),
      error: (err) => {
        console.error('Erreur lors de la mise à jour du vélo :', err);
        this.showMessage('Erreur lors de la mise à jour du vélo.');
      },
    });
  }

  deleteBike(bikeId: number): void {
    this.service.deleteBike(bikeId).subscribe({
      next: () => {
        this.fetchBikes();
        this.showMessage('Vélo supprimé avec succès !');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du vélo :', err);
        this.showMessage('Erreur lors de la suppression du vélo.');
      },
    });
  }

  showMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => (this.message = ''), 3000);
  }
}
