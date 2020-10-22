import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import {DatabaseService} from '../../services/database/database.service';
import {Material} from '../../models/material/material';

@Component({
  selector: 'app-gestionar-material-modal',
  templateUrl: './gestionar-material-modal.component.html',
  styleUrls: ['./gestionar-material-modal.component.scss']
})
export class GestionarMaterialModalComponent implements OnInit {
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
    @Inject(MAT_DIALOG_DATA) public dialogData: any
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
      material.Existencia = parseInt(this.existencia.value.toString(), 32);
      material.Precio = parseFloat(this.precio.value.toString());
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
}
