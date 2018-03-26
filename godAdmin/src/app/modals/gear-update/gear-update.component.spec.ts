import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GearUpdateComponent } from './gear-update.component';

describe('GearUpdateComponent', () => {
  let component: GearUpdateComponent;
  let fixture: ComponentFixture<GearUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GearUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GearUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
