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
  limit: number = 5;
  offset: number = 0;
  length: number = 0;

  paginatorIsEnable: boolean = false;
  queryDelay : number = 250;

  filterTimer : any;
  dataPrefix : string = '';


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
    this.limit = event.pageSize;
    this.offset = event.pageIndex * this.limit;
    this.setListData();
  }

  public applyFilter(event : any) : void
  {
    clearTimeout(this.filterTimer);

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataPrefix = filterValue.trim().toLowerCase();

    this.filterTimer = setTimeout(() => {
      this.offset = 0;
      this.setListData();
    }, 350);
  }
}
