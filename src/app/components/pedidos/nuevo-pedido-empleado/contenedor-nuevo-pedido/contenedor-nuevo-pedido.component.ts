import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenedor-nuevo-pedido',
  templateUrl: './contenedor-nuevo-pedido.component.html',
  styleUrls: ['./contenedor-nuevo-pedido.component.css']
})
export class ContenedorNuevoPedidoComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['pages/pedidos/nuevo'])
  }

}
