import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService
{
  public static language : string = 'RU';

  public getLang()
  {
    return LanguageService.language;
  }

  public changeLanguage(lang : string)
  {
    LanguageService.language = lang;
  }

  constructor() { }
}
