import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenedor-sol-empleado',
  templateUrl: './contenedor-sol-empleado.component.html',
  styleUrls: ['./contenedor-sol-empleado.component.css']
})
export class ContenedorSolEmpleadoComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['pages/solicitudes-empleado/lista'])
  }

}
