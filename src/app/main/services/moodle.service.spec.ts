import { TestBed, inject } from '@angular/core/testing';

import { MoodleService } from './moodle.service';

describe('MoodleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoodleService]
    });
  });

  it('should be created', inject([MoodleService], (service: MoodleService) => {
    expect(service).toBeTruthy();
  }));
});
