import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSolProvComponent } from './lista-sol-prov.component';

describe('ListaSolProvComponent', () => {
  let component: ListaSolProvComponent;
  let fixture: ComponentFixture<ListaSolProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSolProvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSolProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
