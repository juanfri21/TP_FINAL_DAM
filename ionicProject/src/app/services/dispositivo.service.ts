import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class DispositivoService {
    urlApi = "http://localhost:3000";
    // listado:Array<Dispositivo> = new Array<Dispositivo>();

    constructor(private _http: HttpClient) {
        console.log('constructor dispositivo service')

    }


    getListadoDispositivos(): Promise<Dispositivo[]> {
        console.log('getListadoDispositivos')

        return this._http.get(this.urlApi + "/api/dispositivo/").toPromise().then((listado: Dispositivo[]) => {
            return listado;
        }).catch((err) => {
            console.log('Error en consulta getListadoDispositivos');
            return null;
        });
    }

    getDispositivo(id): Promise<Dispositivo> {
        console.log('getDispositivo')

        return this._http.get(this.urlApi + "/api/dispositivo/" + id).toPromise().then((dispositivo: Dispositivo) => {
            return dispositivo;
        }).catch((err) => {
            console.log('Error en consulta getDispositivo');
            return null;
        });
    };

}
