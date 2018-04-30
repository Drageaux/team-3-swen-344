import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomFormComponent } from './classroom-form.component';

describe('ClassroomFormComponent', () => {
  let component: ClassroomFormComponent;
  let fixture: ComponentFixture<ClassroomFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
