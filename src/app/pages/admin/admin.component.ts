import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  // Menu items for the sidebar
  menuItems = [
    { name: 'Stations', route: '/admin/stations' },
    { name: 'Vélos', route: '/admin/velos' },
    { name: 'Types de Vélos', route: '/admin/type-velos' },
    { name: 'Réservations', route: '/admin/reservations' },
    { name: 'Utilisateurs', route: '/admin/utilisateurs' },
  ];
}
