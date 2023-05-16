import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Barrio } from 'src/app/interfaces/barrio';
import { ResumeDireccion } from 'src/app/interfaces/direccion';
import { ResumeEmpresa } from 'src/app/interfaces/empresa';
import { Localidad } from 'src/app/interfaces/localidad';
import { Pais } from 'src/app/interfaces/pais';
import { Provincia } from 'src/app/interfaces/provincia';
import { Rol } from 'src/app/interfaces/rol';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.css']
})
export class CrearProveedorComponent implements OnInit, OnDestroy {

  private suscripcion = new Subscription();

  mensajeErrores: String[]
  mensajeError: String = ""

  public formularioAlta: FormGroup

  roles: Rol[]
  paises: Pais[]
  provincias: Provincia[]
  localidades: Localidad[]
  barrios: Barrio[]

  idpais: Number
  idprovincia: Number
  idlocalidad: Number
  idbarrio: Number

  usuario: Usuario = {} as Usuario

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvProveedor: EmpresaService,
    private srvDireccion: DireccionService
  ) { 
    this.formularioAlta = this.fb.group(
      {
        nombre: ["", Validators.required],
        cuit: ["", Validators.required],
        telefono: ["", Validators.required],
        calle: ["", Validators.required],
        altura: ["", Validators.required],
        idpais: ["", Validators.required],
        idprovincia: ["", Validators.required],
        idlocalidad: ["", Validators.required],
        idbarrio: ["", Validators.required],
        iddireccion: [""],
      }
    )
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ngOnInit(): void {

    let usr = this.srv.getUser()
    this.suscripcion.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next:(usuario) => {
          this.usuario = usuario
        },
      })
    )
    this.completarListas()
  }

  completarListas(){
    this.suscripcion.add(this.srvDireccion.obtenerPaises().subscribe({
      next: (paises) =>{
        this.paises = paises
      },
      error: (err) => {
        this.mostrarMsjError(err.error.message);
      }
    }))
    this.suscripcion.add(
      this.formularioAlta.controls['idpais'].valueChanges.subscribe({
        next: (idpais) =>{
          this.suscripcion.add(this.srvDireccion.obtenerProvincias(idpais).subscribe({
            next: (provincias) =>{
              this.provincias = provincias
              this.localidades = []
              this.barrios = []
            },
            error: (err) => {
              this.mostrarMsjError(err.error.message);
            }
          }))
        }
      })
    )
    this.suscripcion.add(
      this.formularioAlta.controls['idprovincia'].valueChanges.subscribe({
        next: (idprovincia) =>{
          this.suscripcion.add(this.srvDireccion.obtenerLocalidades(idprovincia).subscribe({
            next: (localidades) =>{
              this.localidades = localidades
              this.barrios = []
            },
            error: (err) => {
              this.mostrarMsjError(err.error.message);
            }
          }))
        }
      })
    )
    this.suscripcion.add(
      this.formularioAlta.controls['idlocalidad'].valueChanges.subscribe({
        next: (idlocalidad) =>{
          this.suscripcion.add(this.srvDireccion.obtenerBarrios(idlocalidad).subscribe({
            next: (barrios) =>{
              this.barrios = barrios
            },
            error: (err) => {
              this.mostrarMsjError(err.error.message);
            }
          }))
        }
      })
    )
  }

  guardar(){
    if (this.formularioAlta.invalid) {
      this.mostrarMsjError('Formulario Invalido');
    } else {

      try {
        let direccion: ResumeDireccion = {
          "calle": this.formularioAlta.value.calle,
          "altura": this.formularioAlta.value.altura,
          "idbarrio": this.formularioAlta.value.idbarrio
        }
  
        this.suscripcion.add(this.srvDireccion.guardarDireccionEmpresa(direccion).subscribe({
          next: (direccion)=>{
            this.guardarEmpresa(direccion.iddireccion)
          },
          error: (err) => {
            this.mostrarMsjError(err.error.message);
          }
        }))
      } catch (error) {
        console.log(error);
      }

    }
  }

  
  guardarEmpresa(iddireccion: number) {

    let proveedor: ResumeEmpresa = {
      'nombre': this.formularioAlta.value.nombre,
      'telefono': this.formularioAlta.value.telefono,
      'cuit': this.formularioAlta.value.cuit,
      'iddireccion': iddireccion,
      'idadmin': this.usuario.idusuario
    }

    Swal.fire({
      title: '¿Desea registrar esta nueva empresa a su cuenta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#000',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {

        this.srvProveedor.registrarProveedor(proveedor).subscribe({
          next: (proveedorResponse) => {

            console.log(proveedorResponse);

            if (proveedorResponse) {

              this.usuario.idempresa = proveedorResponse.idproveedor

              console.log(this.usuario);

              this.srvUsuario.updateUsuarioEmpresa(this.usuario).subscribe({
                next:(value) => {

                  Swal.fire({
                    title: 'Empresa creada con éxito',
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
                  Swal.fire({
                    title: '¡No se pudo asociar la empresa al usuario!',
                    icon: 'error'
                  })
                }
              })
            }
          },
          error: (err) => {
            Swal.fire({
              title: '¡No se pudo crear la empresa!',
              icon: 'error'
            })
          }
        })
      }
    })
  }

  cancelar(){
    this.router.navigate(['pages/proveedor/lista'])
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
    setTimeout(() => {
      this.mensajeError = '';
    }, 3000);
  }

}

