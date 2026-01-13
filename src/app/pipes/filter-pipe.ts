import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(products: Product[], searchText: string, category: string): Product[] {
    if (!products) return [];

    return products.filter(product => {
      const matchesSearch = searchText
        ? product.title.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase())
        : true;

      const matchesCategory = category && category !== 'All'
        ? product.category === category
        : true;

      return matchesSearch && matchesCategory;
    });
  }
}
