import { Empresa } from "./empresa"

export interface ResumeAuthEmpresa {
    idempresa: number,
    idProveedor: number,
    idsolicitante: number
  }

export interface AuthEmpresa {
    idautorizacion: number,
    idempresa: number,
    idempresaProveedor: number,
    idestado: number,
    idautorizante: number,
    fecha: Date,
    idsolicitante: number,
    datosProveedor: Empresa,
    datosEmpresa: Empresa,
    estado: string,
    solicitante: string
  }