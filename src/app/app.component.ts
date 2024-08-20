import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatRadioModule } from "@angular/material/radio";
import {MatExpansionModule} from "@angular/material/expansion";
import {LangComponent} from "./lang/lang.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatRadioModule, MatExpansionModule, LangComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent
{
  currentLanguage : string = 'RU';

  ChangeLanguage(event : any)
  {
    this.currentLanguage = event.value;
  }
}
