import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeVelosRoutingModule } from './type-velos-routing.module';
import { TypeVelosComponent } from './type-velos.component';


@NgModule({
  declarations: [
    TypeVelosComponent
  ],
  imports: [
    CommonModule,
    TypeVelosRoutingModule
  ]
})
export class TypeVelosModule { }
