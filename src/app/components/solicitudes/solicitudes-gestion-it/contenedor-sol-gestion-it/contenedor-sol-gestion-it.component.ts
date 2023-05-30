import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenedor-sol-gestion-it',
  templateUrl: './contenedor-sol-gestion-it.component.html',
  styleUrls: ['./contenedor-sol-gestion-it.component.css']
})
export class ContenedorSolGestionItComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['pages/solicitudes-gestion-it/lista'])
  }

}
