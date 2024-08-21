import {Component} from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {GeoService} from "../services/geo.service";
import {HttpClientModule} from "@angular/common/http";
import {LangComponent} from "../lang/lang.component";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {ListComponent} from "../list/list.component";

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, HttpClientModule, LangComponent, MatIconModule, RouterLink],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
  providers: [GeoService],
})
export class CountryListComponent extends ListComponent
{
  dataSource = [];
  displayedColumns = ['wikiDataId', 'name', 'code', 'currencyCodes'];

  setListData(): void
  {
    this.paginatorIsEnable = true;

    this.geoService.getCountries(this.queryData).subscribe({
      next: (data : any) => {
        this.dataSource = data.data;
        this.queryData.length = data.metadata.totalCount;

        setTimeout(() => {
          this.paginatorIsEnable = false;
        }, this.queryDelay);
      },
      error: (data : any) => {
        if (data.status === 429)
        {
          this.setListData();
        }
      }
    });
  }
}
