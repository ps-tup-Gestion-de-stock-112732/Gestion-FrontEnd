import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenedor-pedidos-empleado',
  templateUrl: './contenedor-pedidos-empleado.component.html',
  styleUrls: ['./contenedor-pedidos-empleado.component.css']
})
export class ContenedorPedidosEmpleadoComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['pages/proveedores/asociados'])
  }

}
