import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { SearchData } from '../../../state/search/search.model';
import { select, Store } from '@ngrx/store';
import { getAllSearchItems } from '../../../state/search';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['userId', 'id', 'title'];
  list$: Observable<SearchData[]>;
  dataSource = [];
  @Input() searchText: string;
  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();
  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.list$ = this.store.pipe(select(getAllSearchItems));
  }

  ngAfterViewInit(): void {
    this.list$.subscribe(res => {
      this.dataSource = res;
    });
  }
}
