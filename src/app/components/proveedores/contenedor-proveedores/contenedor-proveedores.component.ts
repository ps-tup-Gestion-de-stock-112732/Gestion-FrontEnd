import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenedor-proveedores',
  templateUrl: './contenedor-proveedores.component.html',
  styleUrls: ['./contenedor-proveedores.component.css']
})
export class ContenedorProveedoresComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['pages/proveedores/lista'])
  }

}
