import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medicion } from '../model/Medicion';
import { LogRiegos } from '../model/LogRiegos';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})
export class MedicionService {
    urlApi = "http://localhost:3000";

    constructor(private _http: HttpClient) {
        console.log('constructor service medicion')
    }

    getMedicionByIdDispositivo(id): Promise<Medicion> {
        console.log('getMedicionByIdDispositivo')
        return this._http.get(this.urlApi + "/api/medicion/" + id).toPromise().then((med: Medicion) => {
            return med;
        });
    };

    getMedicionesByIdDispositivo(id): Promise<Medicion[]> {
        console.log('getMedicionesByIdDispositivo')
        return this._http.get(this.urlApi + "/api/medicion/" + id + "/todas").toPromise().then((mediciones: Medicion[]) => {
            console.log(mediciones)

            return mediciones;
        });
    };

    agregarMedicion(medicion: Medicion) {
        console.log('agregarMedicion');
        console.log(medicion);
        return this._http.post(this.urlApi + "/api/medicion/agregar", { fecha: medicion.fecha, valor: medicion.valor, dispositivoId: medicion.dispositivoId }).toPromise().then((result) => {
            return result;
        });
    }

    agregarLogRiego(logRiego: LogRiegos) {
        console.log('agregar log riego');
        console.log(logRiego);
        return this._http.post(this.urlApi + "/api/logRiegos/agregar", { fecha: logRiego.fecha, apertura: logRiego.apertura, electrovalvulaId: logRiego.electrovalvulaId }).toPromise().then((result) => {
            console.log(result)
            return result;
        });
    }

    getLogElectrovalvulaByIdElectrovalvula(id_electrovalvula): Promise<LogRiegos[]> {
        console.log('getMedicionesByIdDispositivo')
        console.log('EV id: ' + id_electrovalvula)
        return this._http.get(this.urlApi + "/api/logRiegos/" + id_electrovalvula + "/todas").toPromise().then((logRiegos: LogRiegos[]) => {
            return logRiegos;
        });
    };
}
