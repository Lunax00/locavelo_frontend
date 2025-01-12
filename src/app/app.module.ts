import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './pages/admin/admin.component';
import { StationsComponent } from './pages/stations/stations.component';
import { VelosComponent } from './pages/velos/velos.component';
import { TypeVelosComponent } from './pages/type-velos/type-velos.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { UsersComponent } from './pages/users/users.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LogoutComponent } from './pages/auth/logout/logout.component';
import { HomeComponent } from './pages/home/home.component';
import { StationDetailsComponent } from './pages/station-details/station-details.component';
import { BikeDetailsComponent } from './pages/bike-details/bike-details.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    StationsComponent,
    VelosComponent,
    TypeVelosComponent,
    ReservationsComponent,
    UsersComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    StationDetailsComponent,
    BikeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
