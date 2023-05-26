import { Categoria } from "./categoria";
import { Empresa } from "./empresa";

export interface Producto {
    codigo: number,
    nombreProducto: string,
    descripcion: string,
    precioUnitario: number,
    cantidad: number,
    idProveedor: number,
    idcategoria: number,
    imagen: string,
    datosProveedor: Empresa,
    categoria: Categoria
}