import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenedor-categorias',
  templateUrl: './contenedor-categorias.component.html',
  styleUrls: ['./contenedor-categorias.component.css']
})
export class ContenedorCategoriasComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['pages/categoria/lista'])
  }

}
