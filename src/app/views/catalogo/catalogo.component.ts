import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Material} from '../../models/material/material';
import {Proveedor} from '../../models/proveedor/proveedor';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  categorias: string[] = [];
  proveedores: string[] = [];

  materiales: Material[];

  coleccionDeMateriales: AngularFirestoreCollection<Material>;

  constructor(
    fs: AngularFirestore
  ) {
    fs.collectionGroup<Proveedor>('Proveedores').valueChanges().subscribe(proveedores => {
      const nombreProveedores: string[] = proveedores.map(proveedor => proveedor.Nombre);
      this.proveedores = nombreProveedores.filter((v, i) => nombreProveedores.indexOf(v) === i);
    });

    fs.collectionGroup<Proveedor>('Categorias').valueChanges().subscribe(categorias => {
      const nombreCategorias: string[] = categorias.map(categoria => categoria.Nombre);
      this.categorias = nombreCategorias.filter((v, i) => nombreCategorias.indexOf(v) === i);
    });

    this.coleccionDeMateriales = fs.collection<Material>('Materiales');
    this.coleccionDeMateriales.valueChanges().subscribe(materiales => {
      this.materiales = materiales;
      this.materiales.forEach(materialDoc => {
        console.log(materialDoc);
      });
    });
  }

  ngOnInit(): void {
  }

}
