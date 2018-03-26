import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GearsListComponent } from './gears-list.component';

describe('GearsListComponent', () => {
  let component: GearsListComponent;
  let fixture: ComponentFixture<GearsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GearsListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GearsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
