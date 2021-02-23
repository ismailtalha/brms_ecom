import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandtoolsComponent } from './handtools.component';

describe('HandtoolsComponent', () => {
  let component: HandtoolsComponent;
  let fixture: ComponentFixture<HandtoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandtoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandtoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
