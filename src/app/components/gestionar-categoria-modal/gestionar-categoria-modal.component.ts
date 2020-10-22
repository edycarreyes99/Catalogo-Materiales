import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TYPE_AGREGAR_CATEGORIA, TYPE_EDITAR_CATEGORIA, TYPE_ELIMINAR_CATEGORIA} from '../../types/modal-types';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DatabaseService} from '../../services/database/database.service';

@Component({
  selector: 'app-gestionar-categoria-modal',
  templateUrl: './gestionar-categoria-modal.component.html',
  styleUrls: ['./gestionar-categoria-modal.component.scss']
})
export class GestionarCategoriaModalComponent implements OnInit {
  nombre = new FormControl(this.dialogData.categoria !== undefined ? this.dialogData.categoria.Nombre : '', [
    Validators.required,
    Validators.minLength(4)
  ]);

  TYPE_AGREGAR_CATEGORIA = TYPE_AGREGAR_CATEGORIA;
  TYPE_EDITAR_CATEGORIA = TYPE_EDITAR_CATEGORIA;
  TYPE_ELIMINAR_CATEGORIA = TYPE_ELIMINAR_CATEGORIA;

  constructor(
    public referenciaDialogo: MatDialogRef<GestionarCategoriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
  }

  ngOnInit(): void {
  }

  agregarCategoria(): void {
    if (!this.nombre.valid) {
      alert('El campo \'Nombre\' es requerido.');
      // tslint:disable-next-line:max-line-length
    } else if (this.dialogData.categorias.map(categoria => categoria.toString().toLowerCase().trim()).includes(this.nombre.value.toString().toLowerCase().trim())) {
      alert('Ya existe otra categoria con el mismo nombre. Ingrese otra con un nombre diferente');
    } else {
      this.referenciaDialogo.close(this.nombre.value.toString());
    }
  }

  actualizarCategoria(): void {

  }

  eliminarCategoria(): void {

  }
}
