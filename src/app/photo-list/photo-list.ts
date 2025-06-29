import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FlickrService } from '../flickr';

@Component({
  selector: 'app-photo-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './photo-list.html',
  styleUrls: ['./photo-list.scss'],
})
export class PhotoListComponent {
  @Input() photos: any[] = [];

  constructor(public flickrService: FlickrService) {}
}
