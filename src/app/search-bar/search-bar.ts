import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.scss'],
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();

  searchTerm: string = '';

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.search.emit(this.searchTerm);
    }
  }
}
