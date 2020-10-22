import {Proveedor} from '../proveedor/proveedor';

export class Material {
  Nombre: string;
  Descripcion: string;
  Precio: number;
  Categoria: string[];
  Proveedor: Proveedor[];
  UnidadMedida: string;
  Existencia: number;

  constructor() {
  }
}
