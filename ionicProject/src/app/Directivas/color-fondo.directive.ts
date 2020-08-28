import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColorFondo]'
})
export class ColorFondoDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.setAttribute('color', 'danger');
  }

}
