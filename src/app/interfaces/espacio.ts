import { Oficina } from "./oficina";
import { Usuario } from "./usuario";

export interface Espacio {
    idespacio: number
    fila: number,
    columna: number,
    idempleado: number,
    idestado: number,
    idoficina: number,
    fecha: Date,
    empleado: Usuario,
    oficina: Oficina
  }