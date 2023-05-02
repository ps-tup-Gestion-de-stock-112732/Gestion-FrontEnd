import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { RegistroService } from '../../../services/registro.service';
import { Subscription } from 'rxjs';
import Swal from "sweetalert2";
import { Usuario } from 'src/app/interfaces/usuario';
import { Empresa } from 'src/app/interfaces/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Rol } from 'src/app/interfaces/rol';
import { RolService } from 'src/app/services/rol.service';
import { Area } from 'src/app/interfaces/area';
import { AreaService } from 'src/app/services/area.service';
import { Pais } from 'src/app/interfaces/pais';
import { Provincia } from 'src/app/interfaces/provincia';
import { Localidad } from 'src/app/interfaces/localidad';
import { Barrio } from 'src/app/interfaces/barrio';
import { DireccionService } from 'src/app/services/direccion.service';
import { Direccion } from 'src/app/interfaces/direccion';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, OnDestroy{

  idrol: Number
  idpais: Number
  idprovincia: Number
  idlocalidad: Number
  idbarrio: Number

  private suscripcion = new Subscription();

  mensajeError: String = ""

  public formularioAlta: FormGroup

  usuario: Usuario

  empresas: Empresa[]
  areas: Area[]
  roles: Rol[]
  paises: Pais[]
  provincias: Provincia[]
  localidades: Localidad[]
  barrios: Barrio[]

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private srv: RegistroService,
    private srvEmpresa: EmpresaService,
    private srvRol: RolService,
    private srvAreas: AreaService,
    private srvDireccion: DireccionService) {
    this.formularioAlta = this.fb.group(
      {
        nombre: ["", Validators.required],
        apellido: ["", Validators.required],
        idempresa: ["", Validators.required],
        nro_documento: ["", Validators.required],
        email: ["", Validators.required],
        password: ["", Validators.required],
        telefono: ["", Validators.required],
        calle: [""],
        altura: [""],
        idrol: ["", Validators.required],
        idarea: [""],
        idpais: [""],
        idprovincia: [""],
        idlocalidad: [""],
        idbarrio: [""]
      }
    )
  }

  ngOnInit(): void {
    this.suscripcion.add(this.srvEmpresa.obtenerEmpresas().subscribe({
      next: (empresas) =>{
        this.empresas = empresas
      },
      error: (err) => {
        this.mostrarMsjError(err.error.message);
      }
    }))

    this.suscripcion.add(this.srvAreas.obtenerAreas().subscribe({
      next: (areas) =>{
        this.areas = areas
      },
      error: (err) => {
        this.mostrarMsjError(err.error.message);
      }
    }))

    
    this.suscripcion.add(
      this.formularioAlta.controls['idrol'].valueChanges.subscribe({
        next: (valor) =>{
          this.idrol = valor
        }
      })
    )

    this.suscripcion.add(this.srvRol.obtenerRoles().subscribe({
      next: (roles) =>{
        this.roles = roles
      },
      error: (err) => {
        this.mostrarMsjError(err.error.message);
      }
    }))

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
        next: (valor) =>{
          this.idpais = valor
          this.suscripcion.add(this.srvDireccion.obtenerProvincias(this.idpais).subscribe({
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
        next: (valor) =>{
          this.idprovincia = valor
          this.suscripcion.add(this.srvDireccion.obtenerLocalidades(this.idprovincia).subscribe({
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
        next: (valor) =>{
          this.idlocalidad = valor
          this.suscripcion.add(this.srvDireccion.obtenerBarrios(this.idlocalidad).subscribe({
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

    this.suscripcion.add(
      this.formularioAlta.controls['idbarrio'].valueChanges.subscribe({
        next: (valor) =>{
          this.idbarrio = valor
          
        }
      })
    )
    
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  guardar() {
    if (this.formularioAlta.invalid) {
      this.mostrarMsjError('Formulario Invalido');
    } else {
      
      const direccion: Direccion = {
        "calle": this.formularioAlta.value.calle,
        "altura": this.formularioAlta.value.altura,
        "idbarrio": this.formularioAlta.value.idbarrio
      }
      
      if(this.idrol == 5){
        this.suscripcion.add(this.srvDireccion.guardarDireccion(direccion).subscribe({
          next: ()=>{
            this.guardarUsuario()
          },
          error: (err) => {
            this.mostrarMsjError(err.error.message);
          }
        }))
      }else{
        this.guardarUsuario()
      }
    }
  }

  guardarUsuario(){
    this.srv.registrar(this.formularioAlta.value).subscribe({
      next: () => {
        Swal.fire({
          title: 'Usuario registrado con exito',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#007bff'
        }).then((result) => {
          if (result.isConfirmed) {

            setTimeout(()=>{
              this.router.navigate(['pages/dashboard']);
            },100);
            
          }
        })
      },
      error: (err) => {
        this.mostrarMsjError(err.error.message);
      }
    })
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
    setTimeout(() => {
      this.mensajeError = '';
    }, 3000);
  }
}
