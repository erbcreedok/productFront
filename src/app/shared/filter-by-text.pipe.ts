import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByText'
})
export class FilterByTextPipe implements PipeTransform {

  transform(items: any[], text: string, field: string, reg: boolean = false): any[] {
    if (!items || !text || text === '') {
      return items;
    }
    if (!reg) {
      return items.filter( (item: any) => item[field].toString().toLowerCase().indexOf(text.toLowerCase()) !== -1 );
    }
    return items.filter( (item: any) => item[field].toString().indexOf(text) !== -1 );
  }

}
