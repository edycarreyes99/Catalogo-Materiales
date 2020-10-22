import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Material} from '../../models/material/material';
import {Proveedor} from '../../models/proveedor/proveedor';
import {MatDialog} from '@angular/material/dialog';
import {GestionarMaterialModalComponent} from '../../components/gestionar-material-modal/gestionar-material-modal.component';
import {TYPE_AGREGAR_MATERIAL, TYPE_EDITAR_MATERIAL, TYPE_ELIMINAR_MATERIAL} from '../../types/modal-types';

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

  hayContenido = false;
  cargando = true;

  constructor(
    public fs: AngularFirestore,
    public dialog: MatDialog
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
      if (materiales.length !== 0) {
        this.hayContenido = true;
      }
      this.materiales = materiales;
      this.materiales.forEach(materialDoc => {
        console.log(materialDoc);
      });
      this.cargando = false;
    });
  }

  ngOnInit(): void {
  }

  agregarMaterial(): void {
    this.dialog.open(GestionarMaterialModalComponent, {
      data: {
        proveedores: this.proveedores,
        categorias: this.categorias,
        tituloDialogo: 'Agregar un nuevo material',
        tipoGestion: TYPE_AGREGAR_MATERIAL,
        material: new Material()
      }
    });
  }

  editarMaterial(material: Material): void {
    this.dialog.open(GestionarMaterialModalComponent, {
      data: {
        proveedores: this.proveedores,
        categorias: this.categorias,
        tituloDialogo: 'Editar material: ' + material.Nombre,
        tipoGestion: TYPE_EDITAR_MATERIAL,
        material
      }
    });
  }

  eliminarMaterial(material: Material): void {
    this.dialog.open(GestionarMaterialModalComponent, {
      data: {
        tituloDialogo: 'Eliminar material: ' + material.Nombre,
        tipoGestion: TYPE_ELIMINAR_MATERIAL,
        material
      }
    });
  }
}
