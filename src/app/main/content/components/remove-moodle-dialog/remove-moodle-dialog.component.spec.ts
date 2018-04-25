import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveMoodleDialogComponent } from './remove-moodle-dialog.component';

describe('RemoveMoodleDialogComponent', () => {
  let component: RemoveMoodleDialogComponent;
  let fixture: ComponentFixture<RemoveMoodleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveMoodleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveMoodleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
