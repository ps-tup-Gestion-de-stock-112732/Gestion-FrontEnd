import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectEmpresaComponent } from './redirect-empresa.component';

describe('RedirectEmpresaComponent', () => {
  let component: RedirectEmpresaComponent;
  let fixture: ComponentFixture<RedirectEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
