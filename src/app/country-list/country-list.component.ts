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
    this.setCountriesData();
  }

  limit: number = 5;
  offset: number = 0;
  length: number = 0;

  setCountriesData()
  {
    this.geoService.getCountries(this.limit, this.offset).subscribe({
      next: (data : any) => {
        this.dataSource = data.data;
        this.length = data.metadata.totalCount;
      }
    });
  }

  changePaginator(event : any): void
  {
    this.limit = event.pageSize;
    this.offset = event.pageIndex * this.limit;
    this.setCountriesData();
  }

  applyFilter(event : any) : void
  {

  }
}
