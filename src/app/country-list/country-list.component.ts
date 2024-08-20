import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {GeoService} from "../services/geo.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, HttpClientModule],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
  providers: [GeoService],
})
export class CountryListComponent implements OnInit
{
  displayedColumns = ['wikiDataId', 'name', 'code', 'currencyCodes'];

  dataSource = [
    { wikiDataId : 'Q222', name : 'Afghanistan', code : 'AF', currencyCodes : ['ALL, EUR']},
    { wikiDataId : 'Q222', name : 'Afghanistan', code : 'AF', currencyCodes : ['ALL, EUR']},
    { wikiDataId : 'Q222', name : 'Afghanistan', code : 'AF', currencyCodes : ['ALL, EUR']},
    { wikiDataId : 'Q222', name : 'Afghanistan', code : 'AF', currencyCodes : ['ALL, EUR']},
    { wikiDataId : 'Q222', name : 'Afghanistan', code : 'AF', currencyCodes : ['ALL, EUR']},
    { wikiDataId : 'Q222', name : 'Afghanistan', code : 'AF', currencyCodes : ['ALL, EUR']},
    { wikiDataId : 'Q222', name : 'Afghanistan', code : 'AF', currencyCodes : ['ALL, EUR']},
    { wikiDataId : 'Q222', name : 'Afghanistan', code : 'AF', currencyCodes : ['ALL, EUR']},
  ];

  constructor(private geoService : GeoService) {}

  ngOnInit(): void
  {
    this.geoService.getCountries().subscribe({
      next: (data : any) => {
        console.log(data);
        this.dataSource = data.data;
      }
    });
  }

  applyFilter(event : any) : void
  {

  }
}
