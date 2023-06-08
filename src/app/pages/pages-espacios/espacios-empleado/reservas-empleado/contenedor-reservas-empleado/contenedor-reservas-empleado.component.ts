import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenedor-reservas-empleado',
  templateUrl: './contenedor-reservas-empleado.component.html',
  styleUrls: ['./contenedor-reservas-empleado.component.css']
})
export class ContenedorReservasEmpleadoComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['pages/reservas-empleado/lista'])
  }

}
