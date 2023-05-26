import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResumeAuthEmpresa } from 'src/app/interfaces/authEmpresa';
import { Contrato, ResumeContrato } from 'src/app/interfaces/contrato';
import { Direccion } from 'src/app/interfaces/direccion';
import { Empresa } from 'src/app/interfaces/empresa';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-asociados',
  templateUrl: './lista-asociados.component.html',
  styleUrls: ['./lista-asociados.component.css']
})
export class ListaAsociadosComponent implements OnInit, OnDestroy {

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
    private srvProveedor: EmpresaService,
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
      this.srvContrato.obtenerContratos(this.usuario.idempresa).subscribe({
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

      this.srvProveedor.obtenerEmpresa(contratos[i].idempresaProveedor).subscribe({
        next:(proveedor) =>{

          contratos[i].datosProveedor = proveedor
          this.contratos.push(contratos[i])

          let dire: Direccion = {} as Direccion

          this.srvDireccion.obtenerDireccion(this.contratos[i].datosProveedor.iddireccion).subscribe({
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
      
                              this.contratos[i].datosProveedor.direccion = dire.calle+' '+dire.altura+' '+dire.barrio.nombre+
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
      })     
    }
  }

  buscar(){
    if (this.formularioBusqueda.invalid) {
      this.obtenerContratosAll()
    } else {
      this.suscripcion.add(
        this.srvContrato.obtenerProveedoresXContrato(this.formularioBusqueda.value.busqueda, this.usuario.idempresa).subscribe({
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