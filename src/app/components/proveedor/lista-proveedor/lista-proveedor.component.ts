import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Direccion } from 'src/app/interfaces/direccion';
import { Empresa } from 'src/app/interfaces/empresa';
import { DireccionService } from 'src/app/services/direccion.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-proveedor',
  templateUrl: './lista-proveedor.component.html',
  styleUrls: ['./lista-proveedor.component.css']
})
export class ListaProveedorComponent implements OnInit, OnDestroy {

  p: number = 1;

  formularioBusqueda : FormGroup;

  private suscripcion = new Subscription();

  mensajeError: String = "";

  proveedores: Empresa[]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private srvProveedor: EmpresaService,
    private srvDireccion: DireccionService
  ) { 
    this.formularioBusqueda = this.fb.group({
      busqueda: ["", Validators.required]
    })
  }

  ngOnInit(): void {

    this.obtenerProveedoresAll()

  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  obtenerProveedoresAll(){
    this.suscripcion.add(
      this.srvProveedor.obtenerProveedores(2).subscribe({
        next: (proveedores)=>{

          this.obtenerDireccion(proveedores)
          

        }
      })
    )
  }

  obtenerDireccion(proveedores: Empresa[]){

    this.proveedores = proveedores

    for (let i = 0; i < this.proveedores.length; i++) {

      let dire: Direccion = {} as Direccion

      this.srvDireccion.obtenerDireccion(this.proveedores[i].iddireccion).subscribe({
        next: (direccion) => {
          dire = direccion
          
          this.srvDireccion.obtenerBarrio(dire.idbarrio).subscribe({
            next:(barrio) =>{
              dire.barrio = barrio
  
              this.srvDireccion.obtenerLocalidad(dire.barrio.idlocalidad).subscribe({
                next:(localidad) =>{
                  dire.localidad = localidad
  
                  this.srvDireccion.obtenerProvincia(dire.localidad.idprovincia).subscribe({
                    next:(provincia) =>{
                      dire.provincia = provincia
  
                      this.srvDireccion.obtenerPais(dire.provincia.idprovincia).subscribe({
                        next:(pais) =>{
                          dire.pais = pais
  
                          this.proveedores[i].direccion = dire.calle+' '+dire.altura+' '+dire.barrio.nombre+
                          ', '+dire.localidad.nombre+', '+dire.provincia.nombre+', '+dire.pais.nombre
  
                        },
                      })
                    },
                  })
                },
              })
            },
          })
        },
      })
    }
  }

  buscar(){
    if (this.formularioBusqueda.invalid) {
      this.obtenerProveedoresAll()
    } else {
      this.suscripcion.add(
        this.srvProveedor.obtenerProveedoresXNombre(this.formularioBusqueda.value.busqueda, 2).subscribe({
          next:(proveedores) =>{
            this.proveedores = proveedores

            this.obtenerDireccion(this.proveedores)
          },
        })
      )
    }
  }

  selectProveedor(idempresa: number){
    
    Swal.fire({
      title: '¿Desea asociar este proveedor a su cuenta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        
      }
    })
  }

  mostarForm(){
    this.router.navigate(['/pages/proveedor/crear'])
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}


