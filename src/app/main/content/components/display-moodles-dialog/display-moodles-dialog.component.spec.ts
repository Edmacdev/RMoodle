import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMoodlesDialogComponent } from './display-moodles-dialog.component';

describe('DisplayMoodlesDialogComponent', () => {
  let component: DisplayMoodlesDialogComponent;
  let fixture: ComponentFixture<DisplayMoodlesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayMoodlesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMoodlesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
