import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenedor-sol-ventas',
  templateUrl: './contenedor-sol-ventas.component.html',
  styleUrls: ['./contenedor-sol-ventas.component.css']
})
export class ContenedorSolVentasComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['pages/solicitudes-ventas/lista'])
  }

}
