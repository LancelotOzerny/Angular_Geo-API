import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { MatRadioModule } from "@angular/material/radio";
import {MatExpansionModule} from "@angular/material/expansion";
import {LangComponent} from "./lang/lang.component";
import {LanguageService} from "./services/language.service";
import {TaskComponent} from "./task/task.component";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatRadioModule, MatExpansionModule, LangComponent, TaskComponent, RouterLink, MatMenu, MatButtonModule, MatMenuItem, MatMenuTrigger],
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
