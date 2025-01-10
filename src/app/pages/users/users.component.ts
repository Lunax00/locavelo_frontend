import { Component, OnInit } from '@angular/core';
import { ServicesService } from   '../../services/backend.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchQuery: string = '';
  filterStatus: string = '';
  searchTerm: string = '';
  selectedStatus: string = '';
  creditFilter: number = 0;
  

  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }
  
  fetchUsers(): void {
    this.service.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data; // Initialiser la liste filtrée
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs :', err);
      },
    });
  }
  
  applyFilters(): void {
    this.filteredUsers = this.users.filter((user) => {
      const matchesNameOrEmail =
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus =
        this.selectedStatus === '' || user.status === this.selectedStatus;
      const matchesCredit = user.credits >= this.creditFilter;
  
      return matchesNameOrEmail && matchesStatus && matchesCredit;
    });
  }
  

  loadUsers(): void {
    this.service.getUsers().subscribe((data) => {
      this.users = data;
      this.filterUsers();
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(
      (user) =>
        (!this.searchQuery || user.name.includes(this.searchQuery)) &&
        (!this.filterStatus || user.status === this.filterStatus)
    );
  }

  toggleUserStatus(id: number): void {
    this.service.toggleStatus(id).subscribe(() => this.loadUsers());
  }

  // Modifier les crédits
updateCredits(userId: number, credits: number): void {
  this.service.updateUserCredits(userId, credits).subscribe({
    next: (response) => {
      alert('Crédits mis à jour avec succès !');
      this.loadUsers(); // Recharge la liste des utilisateurs
    },
    error: (err) => {
      console.error('Erreur lors de la mise à jour des crédits :', err);
      alert('Erreur : Impossible de mettre à jour les crédits.');
    },
  });
}
updateStatus(user: any): void {
  this.service.updateUserStatus(user.id, user.status).subscribe({
    next: () => {
      alert(`Statut de l'utilisateur mis à jour avec succès en ${user.status} !`);
    },
    error: (err) => {
      console.error('Erreur lors de la mise à jour du statut :', err);
      alert('Erreur : Impossible de mettre à jour le statut.');
    },
  });
}
// Supprimer un utilisateur
deleteUser(userId: number): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    this.service.deleteUser(userId).subscribe({
      next: () => {
        alert('Utilisateur supprimé avec succès !');
        this.loadUsers(); // Recharge la liste des utilisateurs
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l’utilisateur :', err);
        alert('Erreur : Impossible de supprimer cet utilisateur.');
      },
    });
  }
}

}
