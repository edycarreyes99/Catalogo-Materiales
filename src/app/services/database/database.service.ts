import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Material} from '../../models/material/material';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private fs: AngularFirestore) {
  }

  async agregarMaterial(material: Material): Promise<void> {
    return new Promise(async (resolve, reject) => {
      material.ID = this.fs.createId();
      await this.fs.collection('Materiales').doc(material.ID).set(Object.assign({}, material)).then((materialDoc) => {
        resolve();
      }).catch((e) => {
        reject(e);
      });
    });
  }
}
