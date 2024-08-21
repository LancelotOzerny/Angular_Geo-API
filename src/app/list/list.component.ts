import {Component, OnInit} from '@angular/core';
import {GeoService} from "../services/geo.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {QueryData} from "../query-data.interface";

@Component({
  selector: 'app-list',
  standalone: true,
  template: '',
  providers: [ GeoService, HttpClientModule, HttpClient ]
})
export abstract class ListComponent implements OnInit
{
  queryData : QueryData = {
    limit: 5,
    offset: 0,
    length: 0,
    prefix: '',
  };

  paginatorIsEnable: boolean = false;

  queryDelay : number = 250;
  filterTimer : any;


  /* ABSTRACT */
  abstract dataSource : {}[];
  abstract displayedColumns : string[];

  protected abstract setListData() : void;


  /* GENERAL */
  constructor(protected geoService : GeoService) {}
  public ngOnInit(): void
  {
    this.setListData();
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
