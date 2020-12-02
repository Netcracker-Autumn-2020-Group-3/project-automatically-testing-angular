import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEditCompoundComponent } from './main-edit-compound.component';

describe('MainEditCompoundComponent', () => {
  let component: MainEditCompoundComponent;
  let fixture: ComponentFixture<MainEditCompoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainEditCompoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEditCompoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
