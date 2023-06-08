import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenedor-espacios-empleado',
  templateUrl: './contenedor-espacios-empleado.component.html',
  styleUrls: ['./contenedor-espacios-empleado.component.css']
})
export class ContenedorEspaciosEmpleadoComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['pages/espacios-empleado/lista'])
  }

}
