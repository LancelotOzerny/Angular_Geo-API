import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss'
})
export class CountryListComponent {
  displayedColumns = ['id', 'name', 'code', 'currencyCode'];

  dataSource = [
    { id : 'Q222', name : 'Afghanistan', code : 'AF', currencyCode : ['ALL, EUR']},
    { id : 'Q222', name : 'Afghanistan', code : 'AF', currencyCode : ['ALL, EUR']},
    { id : 'Q222', name : 'Afghanistan', code : 'AF', currencyCode : ['ALL, EUR']},
    { id : 'Q222', name : 'Afghanistan', code : 'AF', currencyCode : ['ALL, EUR']},
    { id : 'Q222', name : 'Afghanistan', code : 'AF', currencyCode : ['ALL, EUR']},
    { id : 'Q222', name : 'Afghanistan', code : 'AF', currencyCode : ['ALL, EUR']},
    { id : 'Q222', name : 'Afghanistan', code : 'AF', currencyCode : ['ALL, EUR']},
    { id : 'Q222', name : 'Afghanistan', code : 'AF', currencyCode : ['ALL, EUR']},
  ];

  applyFilter(event : any)
  {

  }
}
