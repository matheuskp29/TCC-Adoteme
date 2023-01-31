import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDropdownButtonComponent } from './generic-dropdown-button.component';

describe('GenericDropdownButtonComponent', () => {
  let component: GenericDropdownButtonComponent;
  let fixture: ComponentFixture<GenericDropdownButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericDropdownButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericDropdownButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
