import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Medicion } from '../model/Medicion';
import { Dispositivo } from '../model/Dispositivo';
import { LogRiegos } from '../model/LogRiegos';

import { MedicionService } from '../services/medicion.service';
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

    public medicion: Medicion;
    public dispositivo: Dispositivo;
    public logRiegos = new LogRiegos(0, 0, '', 0);
    public id_dispositivo: string;
    public accion_electrovalvula: string;
    public ABRIR_ELECTROVALVULA: string = 'Abrir';
    public CERRAR_ELECTROVALVULA: string = 'Cerrar';
    // public valor_medicion: number = 100;
    public myChart;
    private chartOptions;

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
        this.dispositivo = await this.dServ.getDispositivo(id_dispositivo);
        this.medicion = await this.mServ.getMedicionByIdDispositivo(id_dispositivo);
        this.logRiegos.apertura = 0;    // arranca con la electrovalvula cerrada
        this.logRiegos.electrovalvulaId = this.dispositivo.electrovalvulaId;
        this.accion_electrovalvula = this.ABRIR_ELECTROVALVULA;
        this.generarChart(id_dispositivo, this.medicion.valor);
        this.actualizarGrafica(Number(this.medicion.valor));
    }
    ionViewDidEnter() {
        console.log('ionViewDidEnter')
        // this.generarChart();
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

    clickElectrovalvula() { // cada vez que se presione guardo en la tabla log 
        console.log("click elec");
        let current_datetime = new Date();
        // let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();


        if (this.accion_electrovalvula === this.ABRIR_ELECTROVALVULA) {   // genero mediciones random y muestro en grafico cuando es menor a 30 corta solo(no necesario)
            this.logRiegos.fecha = current_datetime;
            this.logRiegos.apertura = 1;
            console.log('agregar log riego ' + this.logRiegos);

            this.accion_electrovalvula = this.CERRAR_ELECTROVALVULA;
            this.actualizarGrafica(10);
                /*
            let valor = this.medicion.valor;
            var intervalObj = setInterval(() => {
                // valor = Math.random();
                valor--;
                console.log(valor);
                this.actualizarGrafica(valor);
                if (valor <= 5) {
                    clearInterval(intervalObj);
                    this.logRiegos.apertura = 0;
                    this.accion_electrovalvula = this.ABRIR_ELECTROVALVULA;
                    console.log('EV cerrada ' + valor);

                    // this.dispositivoServ.postElectrovalvula(0, this.dispositivo.electrovalvulaId);
                    // this.medicionServ.postMedicion(valor, this.dispositivo.dispositivoId);
                }
            }, 1000);*/

        } else {                                    // tomo ultimo valor y lo inserto en la tabla mediciones
            this.logRiegos.fecha = current_datetime;
            this.logRiegos.apertura = 0;
            console.log('agregar log riego ' + this.logRiegos);
            this.accion_electrovalvula = this.ABRIR_ELECTROVALVULA;

            // let a: Medicion = new Medicion(99, formatted_date, 99, 1);
            console.log('agregarMedicion' + current_datetime);
            // clearInterval(intervalObj);

        }
        console.log('salgo click eletrovalvula');
    }

}