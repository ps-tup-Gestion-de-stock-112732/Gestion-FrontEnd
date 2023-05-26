import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthEmpresa, ResumeAuthEmpresa } from 'src/app/interfaces/authEmpresa';
import { Direccion } from 'src/app/interfaces/direccion';
import { Empresa } from 'src/app/interfaces/empresa';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css']
})
export class ListaProveedoresComponent implements OnInit, OnDestroy {

  p: number = 1;

  formularioBusqueda : FormGroup;

  private suscripcion = new Subscription();

  mensajeError: String = "";

  proveedores: Empresa[] = []
  usuario: Usuario = {} as Usuario

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvProveedor: EmpresaService,
    private srvDireccion: DireccionService,
    private srvSolicitud: SolicitudService
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

          this.obtenerProveedoresAll()
        }
      })
    )

  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  obtenerProveedoresAll(){
    this.suscripcion.add(
      this.srvProveedor.obtenerProveedoresDisponibles(this.usuario.idempresa).subscribe({
        next:(proveedores) =>{

          this.obtenerDireccion(proveedores)
          
        },
        error:(err) => {
          this.proveedores = []
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
        this.srvProveedor.obtenerProveedoresDisponiblesXNombre(this.formularioBusqueda.value.busqueda, this.usuario.idempresa).subscribe({
          next:(proveedores) =>{

            this.obtenerDireccion(proveedores)
            
          },
          error:(err) => {
            this.proveedores = []
          }
        })
      )
    }
  }

  selectProveedor(idempresaProveedor: number){

    let authEmpresa: ResumeAuthEmpresa = {
      'idempresa': this.usuario.idempresa,
      'idProveedor': idempresaProveedor,
      'idsolicitante': this.usuario.idusuario
    }
    
    Swal.fire({
      title: '¿Desea asociar este proveedor a su cuenta?',
      text: 'Se enviará una solicitud al porveedor seleccionado.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.suscripcion.add(
          this.srvSolicitud.registrarSolicitud(authEmpresa).subscribe({
            next:(value) => {
              Swal.fire({
                title: 'Solicitud enviada con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#007bff'
              }).then((result) => {
                if (result.isConfirmed) {

                  this.obtenerProveedoresAll()
      
                }
              })
            },error: (err) => {
              Swal.fire({
                title: '¡No se pudo enviar la solicitud!',
                icon: 'error'
              })
            }
          })
        )
      }
    })
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}

