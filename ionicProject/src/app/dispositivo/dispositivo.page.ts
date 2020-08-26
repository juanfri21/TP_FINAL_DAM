import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medicion } from '../model/Medicion';
import { MedicionService } from '../services/medicion.service';
import { Dispositivo } from '../model/Dispositivo';
import { DispositivoService } from '../services/dispositivo.service';

//TODO: agregar componente log de riegos

import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
    selector: 'app-dispositivo',
    templateUrl: './dispositivo.page.html',
    styleUrls: ['./dispositivo.page.scss'],
})

export class DispositivoPage implements OnInit {

    private valorObtenido: number = 0;
    public myChart;
    private chartOptions;

    public medicion: Medicion;
    public dispositivo: Dispositivo;
    public id_dispositivo: string;
    constructor(private router: ActivatedRoute, private dServ: DispositivoService, private mServ: MedicionService) { }

    ngOnInit() {
        console.log('ngOnInit dispositivo page');
       
        // this.mServ.getMedicionesByid_dispositivo(this.id_dispositivo).then((med) => {
        //     console.log('getMedicionesByid_dispositivo');
        //     console.log(med);
        // });

        //6
        //opción 1- utilizar libreria Momentjs , haciendo npm install --save moment y luego el import * as moment from 'moment'; en donde lo necesitemos.
        // let a : Medicion= new Medicion(99,moment().format("YYYY-MM-DD hh:mm:ss"),99,1);

        //opción 2, utilizar el objeto Date y hacer el formato necesario a mano.
        // let current_datetime = new Date();
        // let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
        // let a: Medicion = new Medicion(99, formatted_date, 99, 1);

        // this.mServ.agregarMedicion(a).then((med) => {
        //     console.log('agregarMedicion');

        //     console.log(med);
        // });
    }

    async ionViewWillEnter() {
        console.log('ion view willl enter')

        let id_dispositivo = this.router.snapshot.paramMap.get('id');
        console.log(id_dispositivo)
        this.dispositivo = await this.dServ.getDispositivo(id_dispositivo);
        console.log(this.dispositivo);
        this.medicion = await this.mServ.getMedicionByIdDispositivo(id_dispositivo);
        console.log(this.medicion)
        this.generarChart(id_dispositivo);
        this.actualizarGrafica(Number(this.medicion.valor));
    }
    ionViewDidEnter() {
        console.log('ionViewDidEnter')
        // this.generarChart();
    }

    actualizarGrafica(valor_medicion: number) {
        console.log(valor_medicion)
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

    generarChart(id_dispositivo: String) {
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
                data: [this.valorObtenido],
                tooltip: {
                    valueSuffix: ' kPA'
                }
            }]

        };
        this.myChart = Highcharts.chart('highcharts', this.chartOptions);
    }

}