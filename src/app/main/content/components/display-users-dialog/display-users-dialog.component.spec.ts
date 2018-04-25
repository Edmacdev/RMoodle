import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUsersDialogComponent } from './display-users-dialog.component';

describe('DisplayUsersDialogComponent', () => {
  let component: DisplayUsersDialogComponent;
  let fixture: ComponentFixture<DisplayUsersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayUsersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
