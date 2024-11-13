import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatName',
  standalone: true
})
export class FormatNamePipe implements PipeTransform {
  transform(value: string): any {
    switch (value) {
      case 'paraiso':
        return 'Paraíso do Tocantins';
      case 'palmas':
        return 'Palmas';
      case 'gurupi':
        return 'Gurupi';
      case 'araguaina':
        return 'Araguaína';
        case 'portonacional':
          return 'Porto Nacional';
      default:
        return value;
    }
  }
}