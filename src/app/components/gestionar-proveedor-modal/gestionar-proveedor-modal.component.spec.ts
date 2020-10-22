import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarProveedorModalComponent } from './gestionar-proveedor-modal.component';

describe('GestionarProveedorModalComponent', () => {
  let component: GestionarProveedorModalComponent;
  let fixture: ComponentFixture<GestionarProveedorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarProveedorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarProveedorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
