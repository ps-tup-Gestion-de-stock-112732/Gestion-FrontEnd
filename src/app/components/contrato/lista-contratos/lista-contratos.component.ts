import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contrato } from 'src/app/interfaces/contrato';
import { Direccion } from 'src/app/interfaces/direccion';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-contratos',
  templateUrl: './lista-contratos.component.html',
  styleUrls: ['./lista-contratos.component.css']
})
export class ListaContratosComponent implements OnInit, OnDestroy {

  p: number = 1;

  formularioBusqueda : FormGroup;

  private suscripcion = new Subscription();

  mensajeError: String = "";

  contratos: Contrato[] = []
  usuario: Usuario = {} as Usuario

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvEmpresa: EmpresaService,
    private srvDireccion: DireccionService,
    private srvContrato: ContratoService
  ) { 
    this.formularioBusqueda = this.fb.group({
      busqueda: ["", Validators.required]
    })
  }

  ngOnInit(): void {

    let usr = this.srv.getUser()
    this.suscripcion.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next:(usuario) => {
          this.usuario = usuario

          this.obtenerContratosAll()
        }
      })
    )

  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  obtenerContratosAll(){
    
    this.suscripcion.add(
      this.srvContrato.obtenerContratosProveedor(this.usuario.idempresa).subscribe({
        next:(contratos) => {

          this.obtenerDireccion(contratos)

        },
        error:(err) => {
          this.contratos = []
        }
      })
    )

  }

  obtenerDireccion(contratos: Contrato[]){

    this.contratos = []

    for (let i = 0; i < contratos.length; i++) {

      this.srvEmpresa.obtenerEmpresa(contratos[i].idempresa).subscribe({
        next:(empresa) =>{

          contratos[i].datosEmpresa = empresa
          let dire: Direccion = {} as Direccion

          this.srvDireccion.obtenerDireccion(contratos[i].datosEmpresa.iddireccion).subscribe({
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
      
                              contratos[i].datosEmpresa.direccion = dire.calle+' '+dire.altura+' '+dire.barrio.nombre+
                              ', '+dire.localidad.nombre+', '+dire.provincia.nombre+', '+dire.pais.nombre

                              this.contratos.push(contratos[i])
      
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
      })     
    }
  }

  buscar(){
    if (this.formularioBusqueda.invalid) {
      this.obtenerContratosAll()
    } else {
      this.suscripcion.add(
        this.srvContrato.obtenerEmpresasXContrato(this.formularioBusqueda.value.busqueda, this.usuario.idempresa).subscribe({
          next:(contratos) =>{

            this.obtenerDireccion(contratos)
            
          },
          error:(err) => {
            this.contratos = []
          }
        })
      )
    }
  }

  bajaContrato(idcontrato: number){
    
    Swal.fire({
      title: '¿Desea dar de baja este contrato?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.suscripcion.add(
          this.srvContrato.bajaContrato(idcontrato).subscribe({
            next:(contrato) => {
              Swal.fire({
                title: 'Contrato dado de baja con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#007bff'
              })

              this.obtenerContratosAll()
            },
            error: (err) => {
              Swal.fire({
                title: 'Error al dar de baja el contrato',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#007bff'
              })
            },
          })
        )
      }
    })
  }

  pendientes(){
    this.router.navigate(['/pages/solicitudes-proveedor/lista'])
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}