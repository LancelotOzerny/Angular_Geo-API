import {Component, Input, OnInit} from '@angular/core';
import {LanguageService} from "../services/language.service";

@Component({
  selector: 'app-lang',
  standalone: true,
  imports: [],
  template: '{{ currentText }}',
  styles: ``,
})
export class LangComponent implements OnInit
{
  @Input() text : { lang : string, text : string }[]  = [];

  currentLang : string = 'RU';
  currentText : string = '';

  constructor(private readonly langService : LanguageService) {}

  ngOnInit()
  {
    this.langService.language$.subscribe(
      lang => {
        this.currentLang = lang;
        this.setText();
      }
    )
  }

  setText() : void
  {
    console.log('test');
    for (let item of this.text)
    {
      if (item.lang === this.langService.getLang())
      {
        this.currentText = item.text;
        break;
      }
    }
  }
}
