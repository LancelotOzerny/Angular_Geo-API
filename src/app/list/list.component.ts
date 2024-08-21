import {Component, OnInit} from '@angular/core';
import {GeoService} from "../services/geo.service";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  template: '',
  styles: ``,
  providers: [ GeoService ]
})
export abstract class ListComponent implements OnInit
{
  queryData = {
    limit: 5,
    offset: 0,
    length: 0,
    prefix: ''
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
