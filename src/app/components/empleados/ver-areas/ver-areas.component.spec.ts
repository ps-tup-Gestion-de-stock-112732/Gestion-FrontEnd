import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAreasComponent } from './ver-areas.component';

describe('VerAreasComponent', () => {
  let component: VerAreasComponent;
  let fixture: ComponentFixture<VerAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerAreasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
