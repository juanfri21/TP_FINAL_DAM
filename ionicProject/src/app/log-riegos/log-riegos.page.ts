import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MedicionService } from '../services/medicion.service';
import { LogRiegos } from '../model/LogRiegos';

@Component({
  selector: 'app-log-riegos',
  templateUrl: './log-riegos.page.html',
  styleUrls: ['./log-riegos.page.scss'],
})
export class LogRiegosPage implements OnInit {

  public logRiegos: LogRiegos[];
  public id_electruvalvula: string;

  constructor(private router: ActivatedRoute, private medicionService: MedicionService) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {

    this.id_electruvalvula = this.router.snapshot.paramMap.get('id');
    this.logRiegos = await this.medicionService.getLogElectrovalvulaByIdElectrovalvula(Number(this.id_electruvalvula));
}

}
