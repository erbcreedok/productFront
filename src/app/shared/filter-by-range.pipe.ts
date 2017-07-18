import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByRange'
})
export class FilterByRangePipe implements PipeTransform {

  transform(items: any[], field: string, min: number = null, max: number = null): any[] {
    if (!items || (min === null && max === null) || min > max ) {
      return items;
    }
    return items.filter( (item: any) => {
      if (min === null && max === null) {
        return +item[field] >= min && +item[field] <= max;
      } else if (min === null) {
        return +item[field] >= min;
      }
      return +item[field] <= max;
    });
  }

}
