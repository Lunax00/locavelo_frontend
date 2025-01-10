import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicesService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  stations: any[] = [];
  stationForm: any = {};
  editingStation: boolean = false;
  selectedFile: File | null = null;

  constructor(private service: ServicesService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStations();
  }

  fetchStations() {
    this.service.getStations().subscribe((data: any) => {
      this.stations = data;
    });
  }
  
  
  saveStation() {
    const formData = new FormData();
    formData.append('name', this.stationForm.name);
    formData.append('address', this.stationForm.address);
    formData.append('capacity', this.stationForm.capacity);
    formData.append('coordinates', this.stationForm.coordinates);
  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
  
    if (this.editingStation && this.stationForm.id) {
      // Mettre à jour la station
      this.service.updateStation(this.stationForm.id, formData).subscribe(
        () => {
          this.fetchStations();
          this.resetForm();
          alert('Station mise à jour avec succès !');
        },
        (err) => {
          console.error('Erreur lors de la mise à jour de la station :', err);
          alert('Erreur lors de la mise à jour.');
        }
      );
    } else {
      // Ajouter une nouvelle station
      this.service.addStation(formData).subscribe(
        () => {
          this.fetchStations();
          this.resetForm();
          alert('Station ajoutée avec succès !');
        },
        (err) => {
          console.error('Erreur lors de l’ajout de la station :', err);
          alert('Erreur lors de l’ajout.');
        }
      );
    }
  }
  
  editStation(station: any) {
    this.stationForm = { ...station }; // Copie profonde de l'objet station
    this.editingStation = true;
  }

  deleteStation(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette station ?')) {
      this.service.deleteStation(id).subscribe(() => {
        this.fetchStations();
      });
    }
  }

  resetForm() {
    this.stationForm = {};
    this.editingStation = false;
    this.selectedFile = null;
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
}
