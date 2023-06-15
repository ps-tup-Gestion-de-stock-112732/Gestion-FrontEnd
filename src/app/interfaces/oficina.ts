import { Empresa } from "./empresa"

export interface Oficina {
    idoficina: number,
    nombreoficina: string,
    idempresa: number,
    cantidadfilas: number,
    cantidadcolumnas: number,
    idestado: number
    empresa: Empresa,
    fechabaja: Date
}