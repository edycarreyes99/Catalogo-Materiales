import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCategoriaModalComponent } from './gestionar-categoria-modal.component';

describe('GestionarCategoriaModalComponent', () => {
  let component: GestionarCategoriaModalComponent;
  let fixture: ComponentFixture<GestionarCategoriaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarCategoriaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCategoriaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
