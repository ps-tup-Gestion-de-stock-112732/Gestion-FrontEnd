import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Espacio } from 'src/app/interfaces/espacio';
import { Oficina } from 'src/app/interfaces/oficina';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EspaciosService } from 'src/app/services/espacios.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-espacios-empleado',
  templateUrl: './lista-espacios-empleado.component.html',
  styleUrls: ['./lista-espacios-empleado.component.css']
})
export class ListaEspaciosEmpleadoComponent implements OnInit, OnDestroy {

  p: number = 1;

  fechaActual: string = ''

  columnas: any[]
  filas: any[]
  
  espacios: any[] = []

  private subs = new Subscription()

  usuario: Usuario = {} as Usuario
  oficinas: Oficina[] = []
  oficina: Oficina = {} as Oficina
  reservados: Espacio[] = []

  formulario : FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvEspacios: EspaciosService,
    private srvEmpresa: EmpresaService
  ) { 
    this.formulario = this.fb.group({
      fecha: [""]
    })
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  async ngOnInit(): Promise<void> {

    await this.obtenerFechaActual()

    let usr = this.srv.getUser()
    this.subs.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next:(usuario) => {
          this.usuario = usuario

          this.srvEspacios.obtenerOficinas(this.usuario.idempresa).subscribe({
            next:async (oficinas) => {
              this.oficinas = oficinas

              await this.obtenerEmpresas()

              this.formulario.controls['fecha'].valueChanges.subscribe({
                next:async (fecha) => {
                  if (this.oficina) {
                    this.obtenerEspacios(this.oficina, fecha)
                  }
                },
              })

            },
          })
        }
      })
    )
  }

  obtenerFechaActual() {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    this.fechaActual = year + "-" + month + "-" + date
  }

  obtenerEmpresas(){

    this.oficinas.forEach(ofi => {
      this.srvEmpresa.obtenerEmpresa(ofi.idempresa).subscribe({
        next:(empresa) => {
          ofi.empresa = empresa
        },
      })
    });
    
  }

  seleccionarOficina(oficina: Oficina){
    this.oficina = oficina
    if (this.formulario.value.fecha) {
      this.obtenerEspacios(this.oficina, this.formulario.value.fecha)
    }
  }

  obtenerEspacios(oficina : Oficina, fecha: Date){

    this.espacios = []

    this.filas = new Array(oficina.cantidadfilas)
    this.columnas = new Array(oficina.cantidadcolumnas)

    this.reservados = []

    this.srvEspacios.obtenerEspaciosReservados(oficina.idoficina, fecha).subscribe({
      next:(espacios) => {
        
        this.reservados = espacios

        for (let f = 0; f < this.filas.length; f++) {

          let columna: Espacio[] = []
          
          for (let c = 0; c < this.columnas.length; c++) {
    
            let espacio: Espacio = {} as Espacio
    
            espacio.fila = f
            espacio.columna = c
    
            for (let r = 0; r < this.reservados.length; r++) {

              if (this.reservados[r].fila == f && this.reservados[r].columna == c && this.reservados[r].idempleado == this.usuario.idusuario) {
                espacio.idestado = 2
                break
              }else if (this.reservados[r].fila == f && this.reservados[r].columna == c && this.reservados[r].idempleado != this.usuario.idusuario) {
                espacio.idestado = 1
                break
              }
            }
              
            if (!espacio.idestado) {
              espacio.idestado = 0
            }
            
            columna.push(espacio)
            
          }
    
          this.espacios.push(columna)
        }

      },
    })
  }

  reservar(espacio: Espacio){

    if (espacio.idestado == 1 || espacio.idestado == 2) {

      Swal.fire({
        title: 'Este espacio ya se encuentra reservado!',
        icon: 'info',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#007bff'
      })
      
    }else{
      Swal.fire({
        title: '¿Desea reservar este espacio?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#000',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          
          this.subs.add(
            this.srvEspacios.reservarEspacio(this.oficina.idoficina, this.usuario.idusuario, espacio.fila, espacio.columna, this.formulario.value.fecha).subscribe({
              next:(espacio) => {
  
                Swal.fire({
                  title: 'Reserva creada con éxito',
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
  
              },error: (err) => {
                Swal.fire({
                  title: '¡No se pudo completar la reserva!',
                  icon: 'error'
                })
              }
  
            })
          )
        }
      })
    }
  }
}
