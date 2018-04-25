import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodlesComponent } from './Moodles.component';

describe('MoodlesComponent', () => {
  let component: MoodlesComponent;
  let fixture: ComponentFixture<MoodlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
