import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarMaterialModalComponent } from './gestionar-material-modal.component';

describe('GestionarMaterialModalComponent', () => {
  let component: GestionarMaterialModalComponent;
  let fixture: ComponentFixture<GestionarMaterialModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarMaterialModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarMaterialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
