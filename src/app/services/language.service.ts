import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LanguageService
{
  private languageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('RU');
  public language$ = this.languageSubject.asObservable();

  public getLang()
  {
    return this.languageSubject.getValue();
  }

  public changeLanguage(lang : string)
  {
    if (this.languageSubject.getValue() !== lang)
    {
      this.languageSubject.next(lang);
    }
  }

  constructor() { }
}
