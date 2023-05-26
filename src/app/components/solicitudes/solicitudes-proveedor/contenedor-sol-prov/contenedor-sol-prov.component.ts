import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenedor-sol-prov',
  templateUrl: './contenedor-sol-prov.component.html',
  styleUrls: ['./contenedor-sol-prov.component.css']
})
export class ContenedorSolProvComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['pages/solicitudes-proveedor/lista'])
  }

}
