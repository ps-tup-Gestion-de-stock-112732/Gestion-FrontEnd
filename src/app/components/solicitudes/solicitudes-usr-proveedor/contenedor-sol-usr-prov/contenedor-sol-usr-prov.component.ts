import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenedor-sol-usr-prov',
  templateUrl: './contenedor-sol-usr-prov.component.html',
  styleUrls: ['./contenedor-sol-usr-prov.component.css']
})
export class ContenedorSolUsrProvComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['pages/solicitudes-usr-proveedor/lista'])
  }

}
