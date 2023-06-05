import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreEstados'
})
export class NombreEstadosPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    if (value == 'Aprobado') {
      return 'Pendiente'
    }

    if (value == 'Rechazado Proveedor') {
      return 'Rechazado'
    }

    return value;
  }

}
