import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericOptionsPanelComponent } from './generic-options-panel.component';

describe('GenericOptionsPanelComponent', () => {
  let component: GenericOptionsPanelComponent;
  let fixture: ComponentFixture<GenericOptionsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericOptionsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericOptionsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
