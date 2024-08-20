import { Component } from '@angular/core';
import {LangComponent} from "../lang/lang.component";
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    LangComponent,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
  ],
  templateUrl: './task.component.html',
  styles: ``
})
export class TaskComponent
{

}
