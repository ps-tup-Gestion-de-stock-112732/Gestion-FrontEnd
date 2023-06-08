import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenedor-espacios-gestion',
  templateUrl: './contenedor-espacios-gestion.component.html',
  styleUrls: ['./contenedor-espacios-gestion.component.css']
})
export class ContenedorEspaciosGestionComponent implements OnInit {

  idoficina: number = 0

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['pages/espacios-gestion/crear'])
  }

  nuevo(){
    this.idoficina = 0
  }

  cambiarOficina(oficina: number){
    
    this.idoficina = oficina
  }


}
