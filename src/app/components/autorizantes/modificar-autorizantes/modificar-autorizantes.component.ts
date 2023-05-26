import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Rol } from 'src/app/interfaces/rol';
import { PatchUsuario, Usuario } from 'src/app/interfaces/usuario';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-autorizantes',
  templateUrl: './modificar-autorizantes.component.html',
  styleUrls: ['./modificar-autorizantes.component.css']
})
export class ModificarAutorizantesComponent implements OnInit, OnDestroy {

  public formulario: FormGroup

  private suscripcion = new Subscription();

  mensajeErrores: String[]
  mensajeError: String = ""

  autorizante: Usuario = {} as Usuario

  roles: Rol[]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private srvUsuario: UsuarioService,
    private srvRol: RolService
  ) { 
    this.formulario = this.fb.group({
      idusuario: [""],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      nro_documento: ["", Validators.required],
      email: ["", Validators.required],
      password: [""],
      telefono: ["", Validators.required],
      idrol: ["", Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']

    this.suscripcion.add(
      this.srvUsuario.obtenerAutorizante(id).subscribe({
        next:(usuario) => {
          this.autorizante = usuario
          this.formulario.patchValue(this.autorizante)
        },
      })
    )

    this.completarListas()
  }

  completarListas(){
    
    this.suscripcion.add(this.srvRol.obtenerRoles().subscribe({
      next: (roles: Rol[]) =>{
        this.roles = roles.filter(r => r.idrol == 2 || r.idrol == 3 )
      },
      error: (err) => {
        this.mostrarMsjError(err.error.message);
      }
    }))
    
  }

  actualizar(){

    if (this.formulario.invalid) {
      this.mostrarMsjError('Formulario Invalido');
    } else {

      Swal.fire({
        title: '¿Seguro/a desea actualizar los datos de este empleado?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#000',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {

        if (result.isConfirmed) {

          this.srvUsuario.updateAutorizante(this.formulario.value).subscribe({
            next: (response) => {
      
              Swal.fire({
                title: 'Usuario autorizante actualizado con éxito',
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
    }
  }

  cancelar(){
    this.router.navigate(['/pages/autorizantes/lista'])
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

