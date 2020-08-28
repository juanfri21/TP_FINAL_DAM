import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MedicionService } from '../services/medicion.service';
import { Medicion } from '../model/Medicion';

@Component({
    selector: 'app-mediciones-sensor',
    templateUrl: './mediciones-sensor.page.html',
    styleUrls: ['./mediciones-sensor.page.scss'],
})
export class MedicionesSensorPage implements OnInit {

    public mediciones: Medicion[];
    public id_dispositivo: string;

    constructor(private router: ActivatedRoute, private medicionService: MedicionService) { }

    ngOnInit() {
    }

    async ionViewWillEnter() {
        this.id_dispositivo = this.router.snapshot.paramMap.get('id');
        this.mediciones = await this.medicionService.getMedicionesByIdDispositivo(Number(this.id_dispositivo));
    }
}
