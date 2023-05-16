import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenedor-empresa',
  templateUrl: './contenedor-empresa.component.html',
  styleUrls: ['./contenedor-empresa.component.css']
})
export class ContenedorEmpresaComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['/pages/empresa/main'])
  }

}
