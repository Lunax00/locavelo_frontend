import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { StationsComponent } from './pages/stations/stations.component';
import { VelosComponent } from './pages/velos/velos.component';
import { TypeVelosComponent } from './pages/type-velos/type-velos.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { StationDetailsComponent } from './pages/station-details/station-details.component';
const routes: Routes = [
  {
      path: 'admin',
      component: AdminComponent, // AdminComponent comme wrapper principal
      children: [
        { path: 'stations', component: StationsComponent },
        { path: 'velos', component: VelosComponent },
        { path: 'type-velos', component: TypeVelosComponent },
        { path: 'reservations', component: ReservationsComponent },
        { path: 'utilisateurs', component: UsersComponent },
        { path: '', redirectTo: 'stations', pathMatch: 'full' }, // Redirection par défaut
      ], canActivate: [AuthGuard] 
    },{ path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
  { path: 'station/:id', component: StationDetailsComponent }, // Détails de la station
  { 
    path: 'reservation/:id', 
    component: ReservationsComponent, 
    canActivate: [AuthGuard], // Protégé par un garde (seulement pour utilisateurs connectés)
  },
    { path: '', redirectTo: 'home', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
