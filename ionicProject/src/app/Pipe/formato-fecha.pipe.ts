import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatoFecha'
})
export class FormatoFechaPipe implements PipeTransform {

  transform(value: string): string {
    const fecha_formateada = moment(value).utc().format("YYYY-MM-DD HH:mm:ss");
    return fecha_formateada;
  }

}
