import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatRadioModule } from "@angular/material/radio";
import {MatExpansionModule} from "@angular/material/expansion";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatRadioModule, MatExpansionModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';
}
