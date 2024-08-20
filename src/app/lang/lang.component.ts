import {Component, Input} from '@angular/core';
import {LanguageService} from "../services/language.service";

@Component({
  selector: 'app-lang',
  standalone: true,
  imports: [],
  templateUrl: './lang.component.html',
  styles: ``,
  providers: [ LanguageService ],
})
export class LangComponent
{
  @Input() text : { lang : string, text : string }[]  = [];

  constructor(private readonly langService : LanguageService) {}

  getText() : string
  {
    let output : string = '';

    for (let item of this.text)
    {
      if (item.lang === this.langService.getLang())
      {
        output = item.text;
        break;
      }
    }

    return output;
  }
}
