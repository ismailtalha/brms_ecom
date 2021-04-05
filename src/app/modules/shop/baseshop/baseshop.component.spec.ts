import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseshopComponent } from './baseshop.component';

describe('BaseshopComponent', () => {
  let component: BaseshopComponent;
  let fixture: ComponentFixture<BaseshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
