import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomReservationFormComponent } from './classroom-reservation-form.component';

describe('ClassroomReservationFormComponent', () => {
  let component: ClassroomReservationFormComponent;
  let fixture: ComponentFixture<ClassroomReservationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomReservationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
