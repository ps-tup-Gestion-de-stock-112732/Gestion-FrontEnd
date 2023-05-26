import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/interfaces/area';
import { AuthEmpresa } from 'src/app/interfaces/authEmpresa';
import { ResumeContrato } from 'src/app/interfaces/contrato';
import { Empresa } from 'src/app/interfaces/empresa';
import { Usuario } from 'src/app/interfaces/usuario';
import { AreaService } from 'src/app/services/area.service';
import { AuthService } from 'src/app/services/auth.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EstadoService } from 'src/app/services/estado.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-sol-prov',
  templateUrl: './lista-sol-prov.component.html',
  styleUrls: ['./lista-sol-prov.component.css']
})
export class ListaSolProvComponent implements OnInit, OnDestroy {

  p: number = 1;

  formularioBusqueda : FormGroup;

  private suscripcion = new Subscription();

  mensajeError: String = "";

  solicitudes: AuthEmpresa[] = []
  usuario: Usuario = {} as Usuario

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvEmpresa: EmpresaService,
    private srvSolicitud: SolicitudService,
    private srvEstado: EstadoService,
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
          this.obtenerSolicitudes()
          
        },
        error:(err) => {
          this.solicitudes = []
        }
      })
    ) 
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  obtenerSolicitudes(){

    this.solicitudes = []
    
    this.srvSolicitud.obtenerSolicitudesPendientesProv(this.usuario.idempresa).subscribe({
      next:(solicitudes) => {

        for (let i = 0; i < solicitudes.length; i++) {

          let solicitud = solicitudes[i]

          this.srvEmpresa.obtenerEmpresa(solicitud.idempresa).subscribe({
            next:(empresa) =>{

              solicitud.datosEmpresa = empresa

              this.srvEstado.obtenerEstado(solicitud.idestado).subscribe({
                next:(estado) => {
                  solicitud.estado = estado.descripcion
                }
              })

              this.srvUsuario.obtenerUsuario(solicitud.idsolicitante).subscribe({
                next:(usuario) => {
                  solicitud.solicitante = usuario.apellido +', '+ usuario.nombre
                },
                error:(err) =>{
                  solicitud.solicitante = ''
                },
              })

              this.solicitudes.push(solicitud)
            }
          })
          
        }
      },
      error:(err) => {
        this.solicitudes = []
      }
    })

  }


  buscar(){
    if (this.formularioBusqueda.invalid) {
      this.obtenerSolicitudes()
    } else {
      this.suscripcion.add(
        this.srvSolicitud.obtenerProveedoresXSolicitud(this.formularioBusqueda.value.busqueda, this.usuario.idempresa).subscribe({
          next:(solicitudes) =>{

            this.solicitudes = []

            for (let i = 0; i < solicitudes.length; i++) {

              let solicitud = solicitudes[i]
    
              this.srvEmpresa.obtenerEmpresa(solicitud.idempresa).subscribe({
                next:(empresa) =>{
    
                  solicitud.datosEmpresa = empresa
                  this.srvEstado.obtenerEstado(solicitud.idestado).subscribe({
                    next:(estado) => {
                      solicitud.estado = estado.descripcion
                    }
                  })
    
                  this.srvUsuario.obtenerUsuario(solicitud.idsolicitante).subscribe({
                    next:(usuario) => {
                      solicitud.solicitante = usuario.apellido +', '+ usuario.nombre
                    },
                    error:(err) =>{
                      solicitud.solicitante = ''
                    },
                  })
    
                  this.solicitudes.push(solicitud)
                }
              })
              
            }
            
          },
          error:(err) => {
            this.solicitudes = []
          }
        })
      )
    }
  }

  aprobar(idautorizacion: number, idempresa: number){

    Swal.fire({
      title: '¿Desea aprobar esta solicitud?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.srvSolicitud.aprobarSolicitudPendientes(idautorizacion, this.usuario.idusuario).subscribe({
          next:(solicitud) => {

            let contrato: ResumeContrato = {} as ResumeContrato
            contrato.idempresa = idempresa
            contrato.idempresaProveedor = this.usuario.idempresa
            contrato.idautorizacion = idautorizacion

            this.srvContrato.registrarContrato(contrato).subscribe({
              next:(contrato) => {
    
                Swal.fire({
                  title: 'Se ha aprobado la solicitud con éxito!',
                  icon: 'success',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Aceptar'
                })
    
                this.obtenerSolicitudes()
              },
              error:(err) =>{
                Swal.fire({
                  title: 'No se pudo aprobar la solicitud',
                  icon: 'error',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Aceptar'
                })
              },
            })
            
          },
          error:(err) =>{
            Swal.fire({
              title: 'No se pudo aprobar la solicitud',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })
          }
        })

        
      }
    })
  }

  rechazar(idautorizacion: number){

    Swal.fire({
      title: '¿Desea rechazar esta solicitud?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.srvSolicitud.rechazarSolicitudPendientes(idautorizacion, this.usuario.idusuario).subscribe({
          next:(solicitud) => {

            Swal.fire({
              title: 'Se ha rechazado la solicitud con éxito!',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })

            this.obtenerSolicitudes()
            
          },
          error:(err) =>{
            Swal.fire({
              title: 'No se pudo rechazar la solicitud',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })
          }
        })
      }
    })
  }

  nuevo(){
    this.router.navigate(['/pages/proveedores/lista'])
  }

  pendientes(){
    this.router.navigate(['/pages/proveedores/pendientes'])
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}