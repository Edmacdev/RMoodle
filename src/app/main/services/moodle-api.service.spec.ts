import { TestBed, inject } from '@angular/core/testing';

import { MoodleApiService } from './moodle-api.service';

describe('MoodleApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoodleApiService]
    });
  });

  it('should be created', inject([MoodleApiService], (service: MoodleApiService) => {
    expect(service).toBeTruthy();
  }));
});
