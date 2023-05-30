import { Estado } from "./estado";
import { Usuario } from "./usuario";

export interface SolicitudGestion {
    idautorizacion: number,
    idpedido: number,
    idestado: number,
    fecha: Date,
    idautorizante: number,
    comentarios: string,
    estado: Estado,
    datosAutorizante: Usuario,
  }