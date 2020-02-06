import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchData } from '../../state/search/search.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<SearchData[]> {
    return this.http.get<SearchData[]>(
      'https://jsonplaceholder.typicode.com/todos/'
    );
  }
}
