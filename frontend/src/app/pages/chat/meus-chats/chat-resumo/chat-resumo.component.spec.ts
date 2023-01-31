import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatResumoComponent } from './chat-resumo.component';

describe('ChatResumoComponent', () => {
  let component: ChatResumoComponent;
  let fixture: ComponentFixture<ChatResumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatResumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
