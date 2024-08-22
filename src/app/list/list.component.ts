import {Component, OnInit} from '@angular/core';
import {GeoService} from "../services/geo.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {QueryData} from "../query-data.interface";
import {LanguageService} from "../services/language.service";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-list',
  standalone: true,
  template: '',
  providers: [ GeoService, HttpClientModule, HttpClient, LanguageService ]
})
export abstract class ListComponent implements OnInit
{
  queryData : QueryData = {
    limit: 5,
    offset: 0,
    length: 0,
    prefix: '',
    lang: 'RU',
    sort: '',
  };

  paginatorIsEnable: boolean = false;

  queryDelay : number = 250;
  filterTimer : any;


  /* ABSTRACT */
  abstract dataSource : {}[];
  abstract displayedColumns : string[];

  protected abstract setListData() : void;


  /* GENERAL */
  constructor(protected geoService : GeoService, protected langService : LanguageService) {}
  public ngOnInit(): void
  {
    this.langService.language$.subscribe(
      lang => {
        this.queryData.lang = lang;
        this.setListData();
      }
    );

    this.setListData();
  }

  public sortChage(sortState : Sort)
  {
    let sort = sortState.active;
    if (sortState.direction === 'desc')
    {
      sort = '-' + sort;
    }

    this.queryData.sort = sort;

    setTimeout(() => {
      this.setListData();
    }, 500);
  }

  /* EVENTS */
  public changePaginator(event : any): void
  {
    this.queryData.limit = event.pageSize;
    this.queryData.offset = event.pageIndex * this.queryData.limit;
    this.setListData();
  }

  public applyFilter(event : any) : void
  {
    clearTimeout(this.filterTimer);

    const filterValue = (event.target as HTMLInputElement).value;
    this.queryData.prefix = filterValue.trim().toLowerCase();

    this.filterTimer = setTimeout(() => {
      this.queryData.offset = 0;
      this.setListData();
    }, 350);
  }
}
