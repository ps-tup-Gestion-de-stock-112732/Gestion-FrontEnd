import { Empresa } from "./empresa";
import { Usuario } from "./usuario";

export interface SolicitudUsuario {
    idautorizacion: number,
    idempresa: number,
    idusuario: number,
    idestado: number,
    fecha: Date,
    estado: string,
    datosEmpresa: Empresa,
    datosUsuario: Usuario
  }