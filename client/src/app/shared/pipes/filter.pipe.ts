import { Pipe, PipeTransform } from '@angular/core';
import { SearchData } from '../../state/search/search.model';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: SearchData[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return (
        // it.userId.toLowerCase().includes(searchText) ||
        // it.id.toLowerCase().includes(searchText) ||
        it.title.toLowerCase().includes(searchText)
      );
    });
  }
}
