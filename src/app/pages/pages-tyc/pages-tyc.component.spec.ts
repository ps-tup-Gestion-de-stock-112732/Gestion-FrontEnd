import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesTycComponent } from './pages-tyc.component';

describe('PagesTycComponent', () => {
  let component: PagesTycComponent;
  let fixture: ComponentFixture<PagesTycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesTycComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesTycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
