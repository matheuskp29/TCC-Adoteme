import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioCadastroComponent } from './anuncio-cadastro.component';

describe('AnuncioCadastroComponent', () => {
  let component: AnuncioCadastroComponent;
  let fixture: ComponentFixture<AnuncioCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnuncioCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
