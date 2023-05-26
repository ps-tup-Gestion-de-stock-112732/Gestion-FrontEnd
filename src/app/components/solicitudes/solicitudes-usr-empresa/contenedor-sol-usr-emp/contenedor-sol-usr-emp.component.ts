import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenedor-sol-usr-emp',
  templateUrl: './contenedor-sol-usr-emp.component.html',
  styleUrls: ['./contenedor-sol-usr-emp.component.css']
})
export class ContenedorSolUsrEmpComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['pages/solicitudes-usr-empresa/lista'])
  }

}
