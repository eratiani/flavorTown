import { Component, EventEmitter, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { DebouncingService } from 'src/app/shared/services/debouncing.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  search = 'title';
  searchInput = '';
  constructor(private debounceServ: DebouncingService) {}
  onSearch(ev: Event) {
    const SearchQuery = (ev.target as HTMLInputElement).value.toLowerCase();
    this.debounceServ.updateValue([SearchQuery, this.search]);
  }
  onSearchTypeChange(ev: MatSelectChange) {
    const SearchType = ev.value.toLowerCase();

    this.debounceServ.updateValue([this.searchInput, SearchType]);
  }
}
