import { TestBed } from '@angular/core/testing';

import { FlickrService } from './flickr';

describe('Flickr', () => {
  let service: FlickrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlickrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
