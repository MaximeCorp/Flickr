import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FlickrService } from '../flickr';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './photo-details.html',
  styleUrls: ['./photo-details.scss'],
})
export class PhotoDetailsComponent implements OnInit {
  photoId: string | null = null;
  photoDetails: any = null;
  photoComments: any[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private flickrService: FlickrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.photoId = params.get('id');
          this.isLoading = true;

          if (this.photoId) {
            return this.flickrService.getPhotoDetails(this.photoId);
          }
          return new Observable<null>();
        })
      )
      .subscribe(
        (response) => {
          if (response && response.photo) {
            this.photoDetails = response.photo;
            this.getComments();
          }
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching photo details:', error);
          this.isLoading = false;
        }
      );
  }

  getComments(): void {
    if (this.photoId) {
      this.flickrService.getPhotoComments(this.photoId).subscribe({
        next: (response) => {
          if (response && response.photo) {
            this.photoDetails = response.photo;
            this.getComments();
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching photo details:', error);
          this.isLoading = false;
        },
      });
    }
  }

  getFlickPhotoUrl(
    photo: any,
    size: 'small' | 'medium' | 'large' = 'medium'
  ): string {
    return this.flickrService.getPhotoUrl(photo, size);
  }
}
