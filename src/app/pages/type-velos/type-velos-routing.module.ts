
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeVelosComponent } from './type-velos.component';

const routes: Routes = [
  { path: '', component: TypeVelosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeVelosRoutingModule {}
