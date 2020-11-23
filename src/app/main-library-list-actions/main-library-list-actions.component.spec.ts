import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLibraryListActionsComponent } from './main-library-list-actions.component';

describe('MainLibraryListActionsComponent', () => {
  let component: MainLibraryListActionsComponent;
  let fixture: ComponentFixture<MainLibraryListActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLibraryListActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLibraryListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
