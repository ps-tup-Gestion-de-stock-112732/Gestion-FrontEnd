import { Component, OnDestroy, OnInit } from '@angular/core';
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
  selector: 'app-lista-reservas-empleado',
  templateUrl: './lista-reservas-empleado.component.html',
  styleUrls: ['./lista-reservas-empleado.component.css']
})
export class ListaReservasEmpleadoComponent implements OnInit, OnDestroy {

  p: number = 1;

  columnas: any[]
  filas: any[]
  
  espacios: any[] = []
  espaciosReservados: any[] = []

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
    private srvEspacios: EspaciosService
  ) { 
    this.formulario = this.fb.group({
      fecha: [""]
    })
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    let usr = this.srv.getUser()
    this.subs.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next:async (usuario) => {
          this.usuario = usuario

          await this.obtenerReservas()
          
        }
      })
    )
  }

  obtenerReservas(){
    this.espaciosReservados = []

    this.srvEspacios.obtenerEspaciosReservadosXEmpleado(this.usuario.idusuario).subscribe({
      next:(espacios) => {
        
        this.espaciosReservados = espacios

        for (let i = 0; i < this.espaciosReservados.length; i++) {
          
          this.srvEspacios.obtenerOficina(this.espaciosReservados[i].idoficina).subscribe({
            next:(oficina) =>{
              
              this.espaciosReservados[i].oficina = oficina
            },
          })
        }
      },
    })
  }

  seleccionarEspacio(espacio: Espacio){
    
    this.obtenerEspacios(espacio.oficina, espacio.fecha)

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

  cancelar(espacio: Espacio){

    Swal.fire({
      title: 'Seguro desea cancelar esta reserva?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#000',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.subs.add(
          this.srvEspacios.cancelarReserva(espacio.idespacio).subscribe({
            next:(espacio) => {

              Swal.fire({
                title: 'Reserva cancelada con éxito',
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
                title: '¡No se pudo cancelar la reserva!',
                icon: 'error'
              })
            }

          })
        )
      }
    })
  }
}
