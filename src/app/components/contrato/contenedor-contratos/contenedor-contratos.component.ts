import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenedor-contratos',
  templateUrl: './contenedor-contratos.component.html',
  styleUrls: ['./contenedor-contratos.component.css']
})
export class ContenedorContratosComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['pages/contrato/lista'])
  }

}
