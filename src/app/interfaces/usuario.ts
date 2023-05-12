export interface Usuario {
  idusuario: number,
  nombre: string,
  apellido: string,
  idempresa: number,
  nro_documento: number,
  email: string,
  password: string,
  telefono: number,
  idrol: number,
  estado?: number,
  idarea: number,
  iddireccion: number,
  esAdmin: number
}
