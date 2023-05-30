import { Empresa } from "./empresa"
import { Producto } from "./producto"
import { Usuario } from "./usuario"

export interface PedidoXDetalle {
    idpedido: number,
    idempleado: number,
    idempresa: number,
    idProveedor: number,
    fecha: number,
    iddetallepedido: number,
    idproducto: number,
    cantidad: number,
    precioUnitario: number,
    datosEmpleado: Usuario,
    datosProveedor: Empresa,
    producto: Producto
  }


export interface Pedido {
    idpedido: number,
    idempleado: number,
    idempresa: number,
    idProveedor: number,
    fecha: number
  }

export interface Detalle {
    iddetallepedido: number,
    idpedido: number,
    idproducto: number,
    cantidad: number,
    precioUnitario: number
  }