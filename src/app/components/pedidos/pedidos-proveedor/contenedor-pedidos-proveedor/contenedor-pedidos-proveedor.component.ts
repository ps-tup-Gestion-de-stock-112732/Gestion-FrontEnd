import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenedor-pedidos-proveedor',
  templateUrl: './contenedor-pedidos-proveedor.component.html',
  styleUrls: ['./contenedor-pedidos-proveedor.component.css']
})
export class ContenedorPedidosProveedorComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['pages/pedidos-proveedor/lista'])
  }

}
