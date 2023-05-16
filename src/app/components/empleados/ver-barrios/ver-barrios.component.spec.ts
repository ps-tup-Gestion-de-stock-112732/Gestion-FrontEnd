import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerBarriosComponent } from './ver-barrios.component';

describe('VerBarriosComponent', () => {
  let component: VerBarriosComponent;
  let fixture: ComponentFixture<VerBarriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerBarriosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerBarriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
