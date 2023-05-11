import { Barrio } from "./barrio";
import { Localidad } from "./localidad";
import { Pais } from "./pais";
import { Provincia } from "./provincia";

export interface Direccion {
    iddireccion: number,
    calle: string,
    altura: number,
    idbarrio: number,
    barrio: Barrio,
    localidad: Localidad,
    provincia: Provincia,
    pais: Pais
  }

