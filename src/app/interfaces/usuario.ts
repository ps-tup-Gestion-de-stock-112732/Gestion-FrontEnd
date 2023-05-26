export interface ResumeUsuario {
  idusuario?: number,
  nombre: string,
  apellido: string,
  nro_documento: number,
  email: string,
  telefono: number,
  idarea: number
}

export interface PatchUsuario {
  idusuario: number,
  nombre: string,
  apellido: string,
  nro_documento: number,
  email: string,
  password: string,
  telefono: number,
  idrol: number
}

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
  direccion: string,
  area: string,
  rol: string
}
