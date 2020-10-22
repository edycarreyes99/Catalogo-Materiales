import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Material} from '../../models/material/material';
import {Categoria} from '../../models/categoria/categoria';
import {Proveedor} from '../../models/proveedor/proveedor';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private fs: AngularFirestore) {
  }

  async agregarMaterial(material: Material): Promise<void> {
    return new Promise(async (resolve, reject) => {
      material.ID = this.fs.createId();
      await this.fs.collection('Materiales').doc(material.ID).set(Object.assign({}, material)).then(async (materialDoc) => {
        const batch = this.fs.firestore.batch();

        material.Categorias.forEach(categoria => {
          const nuevaCategoria = new Categoria();
          nuevaCategoria.ID = this.fs.createId();
          nuevaCategoria.Nombre = categoria;
          // tslint:disable-next-line:max-line-length
          batch.set(this.fs.collection('Materiales').doc(material.ID).collection('Categorias').doc(nuevaCategoria.ID).ref, Object.assign({}, nuevaCategoria));
        });

        material.Proveedores.forEach(proveedor => {
          const nuevoProveedor = new Proveedor();
          nuevoProveedor.ID = this.fs.createId();
          nuevoProveedor.Nombre = proveedor;
          // tslint:disable-next-line:max-line-length
          batch.set(this.fs.collection('Materiales').doc(material.ID).collection('Proveedores').doc(nuevoProveedor.ID).ref, Object.assign({}, nuevoProveedor));
        });

        await batch.commit().then(() => {
          console.log('Todas las categorias y los proveedores se han guardado correctemente en la base de datos');
          resolve();
        }).catch((e) => reject(e));
      }).catch(e => reject(e));
    });
  }
}
