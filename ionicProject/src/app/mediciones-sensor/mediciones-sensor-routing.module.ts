import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicionesSensorPage } from './mediciones-sensor.page';

const routes: Routes = [
  {
    path: '',
    component: MedicionesSensorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicionesSensorPageRoutingModule {}
