import { Categoria } from "./categoria";
import { Empresa } from "./empresa";

export interface ProveedorXCategoria {
    proveedor: Empresa,
    categoria: Categoria[]
  }