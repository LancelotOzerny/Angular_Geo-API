import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatRadioModule } from "@angular/material/radio";
import {MatExpansionModule} from "@angular/material/expansion";
import {LangComponent} from "./lang/lang.component";
import {LanguageService} from "./services/language.service";
import {TaskComponent} from "./task/task.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatRadioModule, MatExpansionModule, LangComponent, TaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ LanguageService ],
})
export class AppComponent
{
  constructor( private langService : LanguageService ) {}

  ChangeLanguage(event : any)
  {
    this.langService.changeLanguage(event.value);
  }
}
