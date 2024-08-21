import { Routes } from '@angular/router';

import {CountryListComponent} from "./country-list/country-list.component";
import {CitiesListComponent} from "./cities-list/cities-list.component";

export const routes: Routes = [
  {
    path: 'countries',
    component: CountryListComponent,
  },
  {
    path: 'cities',
    component: CitiesListComponent,
  },
  {
    path: 'cities/:id',
    component: CitiesListComponent,
  },
  {
    path: '**',
    redirectTo: '/countries'
  },
];
