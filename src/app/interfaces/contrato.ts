import { Empresa } from "./empresa"

export interface ResumeContrato {
  idempresa: number,
  idempresaProveedor: number,
  idautorizacion: number
}

export interface Contrato {
    id: number,
    idempresa: number,
    idempresaProveedor: number,
    fechaFin: Date,
    datosProveedor: Empresa
    datosEmpresa: Empresa
  }