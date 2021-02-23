import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopproductsComponent } from './topproducts.component';

describe('TopproductsComponent', () => {
  let component: TopproductsComponent;
  let fixture: ComponentFixture<TopproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
