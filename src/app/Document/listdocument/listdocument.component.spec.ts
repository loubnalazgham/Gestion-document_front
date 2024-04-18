import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdocumentComponent } from './listdocument.component';

describe('ListdocumentComponent', () => {
  let component: ListdocumentComponent;
  let fixture: ComponentFixture<ListdocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
