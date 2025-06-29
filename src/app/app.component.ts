// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SearchBarComponent } from './search-bar/search-bar';
import { PhotoListComponent } from './photo-list/photo-list';
import { FilterOptionsComponent } from './filter-options/filter-options';
import { FlickrService } from './flickr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SearchBarComponent,
    PhotoListComponent,
    FilterOptionsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'flickr-photo-search';
  photos: any[] = [];
  currentSearchParams: any = { text: '' };

  constructor(private flickrService: FlickrService) {}

  onSearch(searchTerm: string): void {
    this.currentSearchParams.text = searchTerm;
    this.performSearch();
  }

  onFilterChange(filters: any): void {
    this.currentSearchParams = { ...this.currentSearchParams, ...filters };
    this.performSearch();
  }

  performSearch(): void {
    console.log('Performing search with params:', this.currentSearchParams);
    this.flickrService.searchPhotos(this.currentSearchParams).subscribe({
      next: (response) => {
        if (response && response.photos && response.photos.photo) {
          this.photos = response.photos.photo;
        } else {
          this.photos = [];
        }
      },
      error: (error) => {
        console.error('Error fetching photos:', error);
      },
    });
  }
}
