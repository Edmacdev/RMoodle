import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoodleDialogComponent } from './add-moodle-dialog.component';

describe('AddMoodleDialogComponent', () => {
  let component: AddMoodleDialogComponent;
  let fixture: ComponentFixture<AddMoodleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMoodleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoodleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
