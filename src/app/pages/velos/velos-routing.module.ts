
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VelosComponent } from './velos.component';

const routes: Routes = [
  { path: '', component: VelosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VelosRoutingModule {}
