import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancyPopupComponent } from './lancy-popup.component';

describe('LancyPopupComponent', () => {
  let component: LancyPopupComponent;
  let fixture: ComponentFixture<LancyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancyPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LancyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
