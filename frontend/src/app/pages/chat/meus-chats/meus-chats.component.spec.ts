import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusChatsComponent } from './meus-chats.component';

describe('MeusChatsComponent', () => {
  let component: MeusChatsComponent;
  let fixture: ComponentFixture<MeusChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeusChatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
