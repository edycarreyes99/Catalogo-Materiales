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

  async actualizarMaterial(material: Material): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.fs.collection('Materiales').doc(material.ID).update(Object.assign({}, material)).then(async (materialDoc) => {
        const batch = this.fs.firestore.batch();

        this.fs.collection('Materiales').doc(material.ID).collection('Categorias').get().subscribe(categorias => {
          categorias.forEach(categoria => {
            if (!material.Categorias.includes(categoria.data().Nombre)) {
              batch.delete(categoria.ref);
            }
          });
          material.Categorias.forEach(categoria => {
            if (!categorias.docs.map(cat => cat.data().Nombre).includes(categoria)) {
              const nuevaCategoria = new Categoria();
              nuevaCategoria.ID = this.fs.createId();
              nuevaCategoria.Nombre = categoria;

              // tslint:disable-next-line:max-line-length
              batch.set(this.fs.collection('Materiales').doc(material.ID).collection('Categorias').doc(nuevaCategoria.ID).ref, Object.assign({}, nuevaCategoria));
            }
          });
        });

        this.fs.collection('Materiales').doc(material.ID).collection('Proveedores').get().subscribe(proveedores => {
          proveedores.forEach(proveedor => {
            if (!material.Proveedores.includes(proveedor.data().Nombre)) {
              batch.delete(proveedor.ref);
            }
          });
          material.Proveedores.forEach(proveedor => {
            if (!proveedores.docs.map(pro => pro.data().Nombre).includes(proveedor)) {
              const nuevoProveedor = new Proveedor();
              nuevoProveedor.ID = this.fs.createId();
              nuevoProveedor.Nombre = proveedor;

              // tslint:disable-next-line:max-line-length
              batch.set(this.fs.collection('Materiales').doc(material.ID).collection('Proveedores').doc(nuevoProveedor.ID).ref, Object.assign({}, nuevoProveedor));
            }
          });
        });

        await batch.commit().then(() => {
          console.log('Todas las categorias y los proveedores junto con el material se han actualizado correctemente en la base de datos');
          resolve();
        }).catch((e) => reject(e));
      }).catch((e) => reject(e));
    });
  }

  async eliminarMaterial(material: Material): Promise<void> {
    return new Promise(async (reject, resolve) => {
      const batch = this.fs.firestore.batch();

      batch.delete(this.fs.collection('Materiales').doc(material.ID).ref);

      await batch.commit().then(async () => {
        console.log('Todas las categorias y los proveedores junto con el material se han eliminado correctemente de la base de datos');
        resolve();
      }).catch((e) => reject(e));
    });
  }
}
