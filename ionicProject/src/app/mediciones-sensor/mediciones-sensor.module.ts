import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicionesSensorPageRoutingModule } from './mediciones-sensor-routing.module';

import { MedicionesSensorPage } from './mediciones-sensor.page';
import { FormatoFechaPipe } from '../Pipe/formato-fecha.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicionesSensorPageRoutingModule
  ],
  declarations: [MedicionesSensorPage, FormatoFechaPipe]
})
export class MedicionesSensorPageModule { }
