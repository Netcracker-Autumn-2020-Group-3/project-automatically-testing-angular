import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordSettingsComponent } from './reset-password-settings.component';

describe('ResetPasswordSettingsComponent', () => {
  let component: ResetPasswordSettingsComponent;
  let fixture: ComponentFixture<ResetPasswordSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
