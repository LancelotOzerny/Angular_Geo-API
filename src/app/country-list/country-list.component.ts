import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {GeoService} from "../services/geo.service";
import {HttpClientModule} from "@angular/common/http";
import {LangComponent} from "../lang/lang.component";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, HttpClientModule, LangComponent, MatIconModule, RouterLink],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
  providers: [GeoService],
})
export class CountryListComponent implements OnInit
{
  displayedColumns = ['wikiDataId', 'name', 'code', 'currencyCodes'];

  dataSource = [];

  limit: number = 5;
  offset: number = 0;
  length: number = 0;

  paginatorIsEnable: boolean = false;
  queryDelay : number = 250;

  constructor(private geoService : GeoService) {}

  ngOnInit(): void
  {
    this.setCountriesData();
  }

  setCountriesData()
  {
    this.paginatorIsEnable = true;

    this.geoService.getCountries(this.limit, this.offset, this.dataPrefix).subscribe({
      next: (data : any) => {
        this.dataSource = data.data;
        this.length = data.metadata.totalCount;

        setTimeout(() => {
          this.paginatorIsEnable = false;
        }, this.queryDelay);
      },
      error: (data : any) => {
        if (data.status === 429)
        {
          this.setCountriesData();
        }
      }
    });
  }

  changePaginator(event : any): void
  {
    this.limit = event.pageSize;
    this.offset = event.pageIndex * this.limit;
    this.setCountriesData();
  }

  filterTimer : any;
  dataPrefix : string = '';

  applyFilter(event : any) : void
  {
    clearTimeout(this.filterTimer);

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataPrefix = filterValue.trim().toLowerCase();

    this.filterTimer = setTimeout(() => {
      this.offset = 0;
      this.setCountriesData();
    }, 350);
  }
}
