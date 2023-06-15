import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersGestionComponent } from './banners-gestion.component';

describe('BannersGestionComponent', () => {
  let component: BannersGestionComponent;
  let fixture: ComponentFixture<BannersGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannersGestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannersGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
