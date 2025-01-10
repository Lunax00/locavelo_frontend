import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-type-velos',
  templateUrl: './type-velos.component.html',
  styleUrls: ['./type-velos.component.css']
})
export class TypeVelosComponent implements OnInit {
  typeVelos: any[] = [];
  typeVeloForm = { id: null, name: '', description: '', price: 0 };

  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    this.fetchTypeVelos();
  }

  fetchTypeVelos(): void {
    this.service.getTypeVelos().subscribe((data) => {
      this.typeVelos = data;
    });
  }

  onSubmit(): void {
    if (this.typeVeloForm.id) {
      // Modifier un type de vélo
      this.service.updateTypeVelo(this.typeVeloForm.id, this.typeVeloForm).subscribe(() => {
        this.fetchTypeVelos();
        this.resetForm();
      });
    } else {
      // Ajouter un nouveau type de vélo
      this.service.addTypeVelo(this.typeVeloForm).subscribe(() => {
        this.fetchTypeVelos();
        this.resetForm();
      });
    }
  }

  editTypeVelo(type: any): void {
    this.typeVeloForm = { ...type }; // Pré-remplit le formulaire avec les données à modifier
  }

  deleteTypeVelo(id: number): void {
    this.service.deleteTypeVelo(id).subscribe(() => {
      this.fetchTypeVelos();
    });
  }

  resetForm(): void {
    this.typeVeloForm = { id: null, name: '', description: '', price: 0 };
  }
}
