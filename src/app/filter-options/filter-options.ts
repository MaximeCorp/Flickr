import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-options',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-options.html',
  styleUrls: ['./filter-options.scss'],
})
export class FilterOptionsComponent {
  @Output() filtersChanged = new EventEmitter<any>();

  sortOrder: string = 'relevance';
  imageSize: string = '';
  minDate: string = '';
  maxDate: string = '';
  tags: string = '';
  isNSFW: boolean = false;
  inGallery: boolean = false;

  onFilterChange(): void {
    const minUploadDate = this.minDate
      ? Math.floor(new Date(this.minDate).getTime() / 1000)
      : undefined;
    const maxUploadDate = this.maxDate
      ? Math.floor(new Date(this.maxDate).getTime() / 1000)
      : undefined;

    const filters = {
      sort: this.sortOrder,
      extras: this.imageSize ? `url_z,url_c,url_b,url_k,url_h` : undefined,
      min_upload_date: minUploadDate,
      max_upload_date: maxUploadDate,
      tags: this.tags,
      safe_search: this.isNSFW ? 3 : 1,
      in_gallery: this.inGallery ? 1 : 0,
    };

    this.filtersChanged.emit(filters);
  }
}
