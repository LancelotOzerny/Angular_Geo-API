import { Component } from '@angular/core';

import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {LangComponent} from "../lang/lang.component";

@Component({
  selector: 'app-cities-list',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule, LangComponent],
  templateUrl: './cities-list.component.html',
  styleUrl: './cities-list.component.scss'
})
export class CitiesListComponent
{
  countriesSelectControl = new FormControl<{name : string, code : string} | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  countriesData: {name : string, code : string}[] = [
    {name: 'Afganistan', code: 'Q222'},
    {name: 'Afganistan', code: 'Q222'},
    {name: 'Afganistan', code: 'Q222'},
    {name: 'Afganistan', code: 'Q222'},
    {name: 'Afganistan', code: 'Q222'},
    {name: 'Afganistan', code: 'Q222'},
  ];
}
