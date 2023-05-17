import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Direccion } from 'src/app/interfaces/direccion';
import { Empresa } from 'src/app/interfaces/empresa';
import { Usuario } from 'src/app/interfaces/usuario';
import { AreaService } from 'src/app/services/area.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit, OnDestroy {

  p: number = 1;
  
  formularioBusqueda : FormGroup;

  @Output() cambioMostrar = new EventEmitter<boolean>()
  @Input() empresa: Empresa = {} as Empresa

  mostrar: boolean = false

  private suscripcion = new Subscription();

  mensajeError: String = "";

  empleados: Usuario[]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private srvUsuario: UsuarioService,
    private srvDireccion: DireccionService,
    private srvArea: AreaService
  ) { 
    this.formularioBusqueda = this.fb.group({
      busqueda: ["", Validators.required]
    })
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.obtenerEmpleadosAll()
    }, 100);
    
  }

  buscar(){
    if (this.formularioBusqueda.invalid) {
      this.obtenerEmpleadosAll()
    } else {
      this.suscripcion.add(
        this.srvUsuario.obtenerEmpleadosXNombre(this.formularioBusqueda.value.busqueda, this.empresa.idempresa).subscribe({
          
          next:(empleados) =>{
            this.empleados = empleados

            this.obtenerArea(this.empleados)
          },
          error: (err) => {
            this.empleados = []
          }
        })
      )
    }
  }

  obtenerEmpleadosAll(){

    this.suscripcion.add(
      this.srvUsuario.obtenerEmpleados(this.empresa.idempresa).subscribe({
        next: (empleados)=>{

          this.empleados = empleados
          
          this.obtenerArea(this.empleados)

        },
        error: (err) => {
          this.empleados = []
        }
      })
    )
  }

  obtenerArea(empleados: Usuario[]){

    for (let i = 0; i < empleados.length; i++) {
      this.srvArea.obtenerArea(empleados[i].idarea).subscribe({
        next:(area) => {
          this.empleados[i].area = area.nombre
        },
      })
    }
  }

  elimarEmpleado(idempleado: number){

    Swal.fire({
      title: '¿Desea dar de baja este empleado?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#000',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.suscripcion.add(
          this.srvUsuario.bajaEmpleado(idempleado).subscribe({
            next:(value) => {

              Swal.fire({
                title: 'Empleado eliminado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#007bff'
              }).then((result) => {

                let currentUrl = this.router.url;
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate([currentUrl]);
                });
              })
            },
            error: (err) => {
              Swal.fire({
                title: '¡No se pudo dar de baja el empleado.!',
                icon: 'error'
              })
            }
          })
        )
      }
    })

    
  }

  mostarForm(){
    (this.mostrar) ? this.mostrar = false : this.mostrar = true
    this.cambioMostrar.emit( this.mostrar )
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

}
