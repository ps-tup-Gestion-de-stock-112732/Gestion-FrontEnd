import { Direccion } from "./direccion";

export interface FetchAllEmpresaResponse{
  count: number;
  next: null;
  previus: null;
  results: Empresa[]
}

export interface Empresa {
    idempresa: number,
    nombre: string,
    telefono: number,
    cuit: number,
    iddireccion: number,
    direccion: string,
    estado: number,
    tipoempresa: number
  }