import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Medicion } from '../model/Medicion';
import { Dispositivo } from '../model/Dispositivo';
import { LogRiegos } from '../model/LogRiegos';

import { MedicionService } from '../services/medicion.service';
import { DispositivoService } from '../services/dispositivo.service';


import * as Highcharts from 'highcharts';
import * as moment from 'moment';

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
    selector: 'app-dispositivo',
    templateUrl: './dispositivo.page.html',
    styleUrls: ['./dispositivo.page.scss'],
})

export class DispositivoPage implements OnInit {

    public medicion = new Medicion(0, ' ', 0, 0);
    public dispositivo = new Dispositivo(0, " ", " ", 0);
    public logRiegos = new LogRiegos(0, 0, '', 0);
    public id_dispositivo: string;
    public accion_electrovalvula: string;
    public ABRIR_ELECTROVALVULA: string = 'Abrir';
    public CERRAR_ELECTROVALVULA: string = 'Cerrar';
    public ELECTROVALVULA_ABIERTA: number = 1;
    public ELECTROVALVULA_CERRADA: number = 0;
    public myChart;
    private chartOptions;

    constructor(private router: ActivatedRoute, private dispositivoService: DispositivoService, private medicionService: MedicionService) { }

    ngOnInit() { }

    // INICIALIZACION
    async ionViewWillEnter() {
        this.id_dispositivo = this.router.snapshot.paramMap.get('id');
        this.dispositivo = await this.dispositivoService.getDispositivo(this.id_dispositivo);
        this.logRiegos.electrovalvulaId = this.dispositivo.electrovalvulaId;
        this.medicion.dispositivoId = this.dispositivo.dispositivoId;
        this.logRiegos.apertura = this.ELECTROVALVULA_CERRADA;    // arranca con la electrovalvula cerrada
        this.accion_electrovalvula = this.ABRIR_ELECTROVALVULA;   // asigno ABRIR al boton de accionamiento de electrovalvula
        this.medicion = await this.medicionService.getMedicionByIdDispositivo(this.dispositivo.dispositivoId);
        this.generarChart(this.id_dispositivo, Number(this.medicion.valor));
        this.actualizarGrafica(Number(this.medicion.valor));
    }

    actualizarGrafica(valor_medicion: number) {
        this.myChart.update({
            series: [{
                name: 'kPA',
                data: [valor_medicion],
                tooltip: {
                    valueSuffix: ' kPA'
                }
            }]
        });
    }

    generarChart(id_dispositivo: String, valor_medicion: number) {
        this.chartOptions = {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            }
            , title: {
                text: 'Sensor N° ' + id_dispositivo
            }

            , credits: { enabled: false }


            , pane: {
                startAngle: -150,
                endAngle: 150
            }
            // the value axis
            , yAxis: {
                min: 0,
                max: 100,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: 'kPA'
                },
                plotBands: [{
                    from: 0,
                    to: 10,
                    color: '#55BF3B' // green
                }, {
                    from: 10,
                    to: 30,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 30,
                    to: 100,
                    color: '#DF5353' // red
                }]
            }
            ,

            series: [{
                name: 'kPA',
                data: [valor_medicion],
                tooltip: {
                    valueSuffix: ' kPA'
                }
            }]

        };
        this.myChart = Highcharts.chart('highcharts', this.chartOptions);
    }

    clickElectrovalvula() {
        let current_datetime = moment().format("YYYY-MM-DD HH:mm:ss");

        if (this.accion_electrovalvula === this.ABRIR_ELECTROVALVULA) {

            this.logRiegos.fecha = current_datetime;
            this.logRiegos.apertura = this.ELECTROVALVULA_ABIERTA;
            this.medicionService.agregarLogRiego(this.logRiegos);

            this.accion_electrovalvula = this.CERRAR_ELECTROVALVULA;
            this.medicion.valor = Math.floor(Math.random() * 100);
            this.actualizarGrafica(Number(this.medicion.valor));

            var intervalObj = setInterval(() => {

                if (this.medicion.valor == 0 || this.logRiegos.apertura == this.ELECTROVALVULA_CERRADA) {
                    clearInterval(intervalObj);
                    intervalObj = null;
                } else {
                    this.medicion.valor--;
                    this.actualizarGrafica(this.medicion.valor);
                }
            }, 1000);
        } else {                                    // tomo ultimo valor y lo inserto en la tabla mediciones
            this.logRiegos.fecha = current_datetime;
            this.logRiegos.apertura = this.ELECTROVALVULA_CERRADA;
            this.medicion.fecha = current_datetime;

            this.accion_electrovalvula = this.ABRIR_ELECTROVALVULA;
            this.medicionService.agregarLogRiego(this.logRiegos);
            this.medicionService.agregarMedicion(this.medicion);
        }
    }

}