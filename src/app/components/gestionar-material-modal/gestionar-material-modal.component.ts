import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import {DatabaseService} from '../../services/database/database.service';
import {Material} from '../../models/material/material';
import {
  TYPE_AGREGAR_CATEGORIA,
  TYPE_AGREGAR_MATERIAL,
  TYPE_AGREGAR_PROVEEDOR,
  TYPE_EDITAR_MATERIAL,
  TYPE_ELIMINAR_MATERIAL
} from '../../types/modal-types';
import {Categoria} from '../../models/categoria/categoria';
import {GestionarCategoriaModalComponent} from '../gestionar-categoria-modal/gestionar-categoria-modal.component';
import {GestionarProveedorModalComponent} from '../gestionar-proveedor-modal/gestionar-proveedor-modal.component';
import {Proveedor} from '../../models/proveedor/proveedor';

@Component({
  selector: 'app-gestionar-material-modal',
  templateUrl: './gestionar-material-modal.component.html',
  styleUrls: ['./gestionar-material-modal.component.scss']
})
export class GestionarMaterialModalComponent implements OnInit {
  TYPE_AGREGAR_MATERIAL = TYPE_AGREGAR_MATERIAL;
  TYPE_EDITAR_MATERIAL = TYPE_EDITAR_MATERIAL;
  TYPE_ELIMINAR_MATERIAL = TYPE_ELIMINAR_MATERIAL;
  nombre = new FormControl(this.dialogData.material !== undefined ? this.dialogData.material.Nombre : '', [
    Validators.required,
    Validators.minLength(4)
  ]);
  descripcion = new FormControl(this.dialogData.material !== undefined ? this.dialogData.material.Descripcion : '', [
    Validators.required,
  ]);
  precio = new FormControl(this.dialogData.material !== undefined ? this.dialogData.material.Precio : '', [
    Validators.required
  ]);
  existencia = new FormControl(this.dialogData.material !== undefined ? this.dialogData.material.Existencia : '', [
    Validators.required
  ]);
  categoriasSeleccionadas = new FormControl(this.dialogData.material !== undefined ? this.dialogData.material.Categorias : [], [
    Validators.required
  ]);
  proveedoresSeleccionados = new FormControl(this.dialogData.material !== undefined ? this.dialogData.material.Proveedores : [], [
    Validators.required
  ]);
  unidadMedida = new FormControl(this.dialogData.material !== undefined ? this.dialogData.material.UnidadMedida : '', [
    Validators.required
  ]);

  materialFormControl = new FormGroup({
    nombre: this.nombre,
    descripcion: this.descripcion,
    precio: this.precio,
    existencia: this.existencia,
    categorias: this.categoriasSeleccionadas,
    proveedores: this.proveedoresSeleccionados,
    unindadMedida: this.unidadMedida
  });

  constructor(
    public referenciaDialogo: MatDialogRef<GestionarMaterialModalComponent>,
    private databaseService: DatabaseService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  loguearDatos($event: MatSelectChange): void {
    console.log($event);
  }

  agregarMaterial(): void {
    if (this.materialFormControl.valid) {
      const material: Material = this.dialogData.material;
      material.Nombre = this.nombre.value;
      material.UnidadMedida = this.unidadMedida.value;
      material.Proveedores = this.proveedoresSeleccionados.value;
      material.Existencia = Number(this.existencia.value);
      material.Precio = Number(this.precio.value);
      material.Descripcion = this.descripcion.value;
      material.Categorias = this.categoriasSeleccionadas.value;

      this.databaseService.agregarMaterial(material).then(() => {
        console.log('El material', material.Nombre, 'se ha guardado correctamente');
        alert('El material ' + material.Nombre + ' se ha guardado correctamente en la base de datos');
        this.referenciaDialogo.close();
      }).catch((e) => {
        console.error(e);
        alert('Hubo un error al guardar el material: ' + e);
      });
    } else {
      alert('Todos los campos son requeridos');
    }
  }

  actualizarMaterial(): void {
    if (this.materialFormControl.valid) {
      const material: Material = this.dialogData.material;
      material.Nombre = this.nombre.value;
      material.UnidadMedida = this.unidadMedida.value;
      material.Proveedores = this.proveedoresSeleccionados.value;
      material.Existencia = Number(this.existencia.value);
      material.Precio = Number(this.precio.value);
      material.Descripcion = this.descripcion.value;
      material.Categorias = this.categoriasSeleccionadas.value;

      this.databaseService.actualizarMaterial(material).then(() => {
        console.log('El material', material.Nombre, 'se ha actualizado correctamente');
        alert('El material ' + material.Nombre + ' se ha actualizado correctamente en la base de datos');
        this.referenciaDialogo.close();
      }).catch((e) => {
        console.error(e);
        alert('Hubo un error al actualizar el material: ' + e);
      });
    } else {
      alert('Todos los campos son requeridos');
    }
  }

  eliminarMaterial(): void {
    const material: Material = this.dialogData.material;
    this.databaseService.eliminarMaterial(material).then(() => {
      console.log('El material', material.Nombre, 'se ha eliminado correctamente');
      alert('El material ' + material.Nombre + ' se ha eliminado correctamente en la base de datos');
      this.referenciaDialogo.close();
    }).catch((e) => {
      console.error(e);
      alert('Hubo un error al eliminar el material: ' + e);
    });
  }

  agregarCategoria(): void {
    let nuevaCategoria;
    const agregarCategoriaDialog = this.dialog.open(GestionarCategoriaModalComponent, {
      data: {
        tituloDialogo: 'Agregar una nueva categoria',
        tipoGestion: TYPE_AGREGAR_CATEGORIA,
        categoria: new Categoria(),
        categorias: this.dialogData.categorias
      }
    });
    agregarCategoriaDialog.afterClosed().subscribe(result => {
      nuevaCategoria = result;
      if (nuevaCategoria.trim() !== '') {
        console.log(nuevaCategoria);
        this.dialogData.categorias.push(nuevaCategoria);
      }
    });
  }

  agregarProveedor(): void {
    let nuevoProveedor;
    const agregarProveedorDialog = this.dialog.open(GestionarProveedorModalComponent, {
      data: {
        tituloDialogo: 'Agregar un nuevo proveedor',
        tipoGestion: TYPE_AGREGAR_PROVEEDOR,
        proveedor: new Proveedor(),
        proveedores: this.dialogData.proveedores
      }
    });
    agregarProveedorDialog.afterClosed().subscribe(result => {
      nuevoProveedor = result;
      if (nuevoProveedor.trim() !== '') {
        console.log(nuevoProveedor);
        this.dialogData.proveedores.push(nuevoProveedor);
      }
    });
  }
}
