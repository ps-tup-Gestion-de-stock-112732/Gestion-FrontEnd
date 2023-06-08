import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Oficina } from 'src/app/interfaces/oficina';
import { EspaciosService } from 'src/app/services/espacios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-espacios-gestion',
  templateUrl: './modificar-espacios-gestion.component.html',
  styleUrls: ['./modificar-espacios-gestion.component.css']
})
export class ModificarEspaciosGestionComponent implements OnInit, OnDestroy {

  private subs = new Subscription()

  idoficina: number

  @Input()
  set ofi(value: number){
    this.completarCampos(value)
  }

  formulario : FormGroup;

  mensajeErrores: String[]
  mensajeError: String = ""

  oficina: Oficina = {} as Oficina
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private srvEspacio: EspaciosService,
    private activatedRoute: ActivatedRoute,
    private srvEspacios: EspaciosService
  ) { 
    this.formulario = this.fb.group({
      nombreoficina: ["", Validators.required],
      cantidadfilas: ["", Validators.required],
      cantidadcolumnas: ["", Validators.required]
    })
  }

  ngOnInit(): void {

  }

  completarCampos( id: number){

    this.idoficina = id
    this.subs.add(
      this.srvEspacio.obtenerOficina(this.idoficina).subscribe({
        next:(oficina) => {
          this.oficina = oficina

          this.formulario.patchValue(oficina);

        },
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  actualizar(){
    if (this.formulario.invalid) {
      this.mostrarMsjError('Formulario Invalido');
    } else {

      let nombre = this.formulario.value.nombreoficina
      let filas = this.formulario.value.cantidadfilas
      let columnas = this.formulario.value.cantidadcolumnas

      try {

        Swal.fire({
          title: '¿Desea actualizar esta oficina?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#000',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {

          if (result.isConfirmed) {
            this.srvEspacios.actualizarOficina(this.oficina.idoficina, this.oficina.idempresa, nombre, filas, columnas).subscribe({
              next:(oficina) => {
                
                Swal.fire({
                  title: 'Oficina actualizada con éxito',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#007bff'
                }).then((result) => {
                  if (result.isConfirmed) {
    
                    let currentUrl = this.router.url;
                    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                      this.router.navigate([currentUrl]);
                    });
        
                  }
                })
              },
              error: (err) => {
                this.mostrarMsjErrores(err.error.errors);
              }
            })
          }
        })
        
      } catch (error) {
        console.log(error);
      }

    }
  }

  eliminar(){
    try {

      Swal.fire({
        title: '¿Desea eliminar esta oficina?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#000',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {

        if (result.isConfirmed) {
          this.srvEspacios.eliminarOficina(this.oficina.idoficina).subscribe({
            next:(oficina) => {
              
              Swal.fire({
                title: 'Oficina eliminada con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#007bff'
              }).then((result) => {
                if (result.isConfirmed) {
  
                  let currentUrl = this.router.url;
                  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                    this.router.navigate([currentUrl]);
                  });
      
                }
              })
            },
            error: (err) => {
              this.mostrarMsjErrores(err.error.errors);
            }
          })
        }
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  mostrarMsjErrores(errores: any[]) {
    let mensajes : String[] = []

    for (let i = 0; i < errores.length; i++) {
      mensajes.push(errores[i].msg)
    }
    
    this.mensajeErrores = mensajes;
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}

