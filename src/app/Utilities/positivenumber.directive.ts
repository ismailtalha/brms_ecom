import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPositivenumber]'
})
export class PositivenumberDirective {

  public text;

  private regex: RegExp = new RegExp(/^-?[1-9]+(\.[1-9]*){0,1}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keypress', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);

    if(next.includes('.')){
      if(this.text == next){
        event.preventDefault();
      }
      this.text= next;
    }
    if ((next && !String(next).match(this.regex))) {  
      event.preventDefault();
    }
  }
}
