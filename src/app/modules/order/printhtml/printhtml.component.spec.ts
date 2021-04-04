import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinthtmlComponent } from './printhtml.component';

describe('PrinthtmlComponent', () => {
  let component: PrinthtmlComponent;
  let fixture: ComponentFixture<PrinthtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinthtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinthtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
