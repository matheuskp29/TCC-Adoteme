import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoResultsPlaceholderComponent } from './no-results-placeholder.component';

describe('NoResultsPlaceholderComponent', () => {
  let component: NoResultsPlaceholderComponent;
  let fixture: ComponentFixture<NoResultsPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoResultsPlaceholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoResultsPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
