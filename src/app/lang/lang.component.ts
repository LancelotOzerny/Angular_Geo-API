import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-lang',
  standalone: true,
  imports: [],
  templateUrl: './lang.component.html',
  styles: ``
})
export class LangComponent
{
  @Input() language : string = 'RU';
  @Input() text : { lang : string, text : string }[]  = [];

  getText() : string
  {
    let output : string = '';

    for (let item of this.text)
    {
      if (item.lang === this.language)
      {
        output = item.text;
        break;
      }
    }

    return output;
  }
}
