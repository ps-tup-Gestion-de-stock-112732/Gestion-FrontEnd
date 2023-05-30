import { Pedido, PedidoXDetalle } from "./pedido";
import { SolicitudGestion } from "./solicitudGestion";

export interface SolicitudGestionXPedido {
    solicitud: SolicitudGestion,
    pedido: PedidoXDetalle
  }