import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMoodleDialogComponent } from './edit-moodle-dialog.component';

describe('EditMoodleDialogComponent', () => {
  let component: EditMoodleDialogComponent;
  let fixture: ComponentFixture<EditMoodleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMoodleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMoodleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
