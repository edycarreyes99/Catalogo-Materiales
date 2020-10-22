import {Component, Inject, OnInit} from '@angular/core';
import {TYPE_AGREGAR_PROVEEDOR, TYPE_EDITAR_PROVEEDOR, TYPE_ELIMINAR_PROVEEDOR} from 'src/app/types/modal-types';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-gestionar-proveedor-modal',
  templateUrl: './gestionar-proveedor-modal.component.html',
  styleUrls: ['./gestionar-proveedor-modal.component.scss']
})
export class GestionarProveedorModalComponent implements OnInit {

  TYPE_AGREGAR_PROVEEDOR = TYPE_AGREGAR_PROVEEDOR;
  TYPE_EDITAR_PROVEEDOR = TYPE_EDITAR_PROVEEDOR;
  TYPE_ELIMINAR_PROVEEDOR = TYPE_ELIMINAR_PROVEEDOR;

  nombre = new FormControl(this.dialogData.proveedor !== undefined ? this.dialogData.proveedor.Nombre : '', [
    Validators.required,
    Validators.minLength(4)
  ]);

  constructor(
    public referenciaDialogo: MatDialogRef<GestionarProveedorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
  }

  ngOnInit(): void {
  }

  agregarProveedor(): void {
    if (!this.nombre.valid) {
      alert('El campo \'Nombre\' es requerido.');
      // tslint:disable-next-line:max-line-length
    } else if (this.dialogData.proveedores.map(proveedor => proveedor.toString().toLowerCase().trim()).includes(this.nombre.value.toString().toLowerCase().trim())) {
      alert('Ya existe otro proveedor con el mismo nombre. Ingrese otro con un nombre diferente');
    } else {
      this.referenciaDialogo.close(this.nombre.value.toString());
    }
  }

  actualizarProveedor(): void {

  }

  eliminarProveedor(): void {

  }
}
