import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeverificationComponent } from './ageverification.component';

describe('AgeverificationComponent', () => {
  let component: AgeverificationComponent;
  let fixture: ComponentFixture<AgeverificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeverificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
