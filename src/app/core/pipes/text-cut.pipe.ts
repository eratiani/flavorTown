import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textCut',
})
export class TextCutPipe implements PipeTransform {
  transform(value: string, maxLength: number = 15): unknown {
    if (!value) {
      return '';
    }

    const words = value.split(' ');

    if (words.length <= maxLength) {
      return value;
    }

    return words.slice(0, maxLength).join(' ') + '...';
  }
}
