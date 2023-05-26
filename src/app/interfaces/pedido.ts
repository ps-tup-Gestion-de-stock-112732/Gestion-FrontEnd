export interface PedidoXDetalle {
    idpedido: number,
    idempleado: number,
    idempresa: number,
    idProveedor: number,
    fecha: number,
    iddetallepedido: number,
    idproducto: number,
    cantidad: number,
    precioUnitario: number
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