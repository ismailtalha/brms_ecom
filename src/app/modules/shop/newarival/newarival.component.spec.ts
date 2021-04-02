import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewarivalComponent } from './newarival.component';

describe('NewarivalComponent', () => {
  let component: NewarivalComponent;
  let fixture: ComponentFixture<NewarivalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewarivalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewarivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
