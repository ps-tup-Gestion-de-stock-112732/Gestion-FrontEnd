import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenedor-empleados',
  templateUrl: './contenedor-empleados.component.html',
  styleUrls: ['./contenedor-empleados.component.css']
})
export class ContenedorEmpleadosComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['/pages/empleados/main'])
  }

}
