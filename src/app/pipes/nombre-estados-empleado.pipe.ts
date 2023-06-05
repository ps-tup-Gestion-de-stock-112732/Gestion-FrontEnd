import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreEstadosEmpleado'
})
export class NombreEstadosEmpleadoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == 'Aprobado') {
      return 'Pendiente Proveedor'
    }

    if (value == 'Rechazado Proveedor') {
      return 'Rechazado'
    }

    return value;
  }

}
