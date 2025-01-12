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
    component: AdminComponent,
    children: [
      { path: 'stations', component: StationsComponent },
      { path: 'velos', component: VelosComponent },
      { path: 'type-velos', component: TypeVelosComponent },
      { path: 'reservations', component: ReservationsComponent },
      { path: 'utilisateurs', component: UsersComponent },
      { path: '', redirectTo: 'stations', pathMatch: 'full' }
    ],
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { 
    path: 'station/:id', 
    component: StationDetailsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'reservation/:id', 
    component: ReservationsComponent,
    canActivate: [AuthGuard] 
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' } // Fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
