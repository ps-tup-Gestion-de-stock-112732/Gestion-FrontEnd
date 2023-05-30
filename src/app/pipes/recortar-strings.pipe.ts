import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recortarStrings'
})
export class RecortarStringsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    
    return value.slice(0,40)+ '...';
  }

}
