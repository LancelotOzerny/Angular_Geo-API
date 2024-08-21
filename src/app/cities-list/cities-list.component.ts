import {Component, OnInit} from '@angular/core';
import {GeoService} from "../services/geo.service";
import {HttpClientModule} from "@angular/common/http";
import {LangComponent} from "../lang/lang.component";
import {MatIconModule} from "@angular/material/icon";
import {ListComponent} from "../list/list.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-cites-list',
  imports: [HttpClientModule, LangComponent, MatIconModule, MatFormFieldModule, MatSelectModule],
  standalone: true,
  templateUrl: 'cities-list.component.html',
  styleUrl: 'cities-list.component.scss',
  providers: [ GeoService ]
})
export class CitiesListComponent extends ListComponent implements OnInit
{
  dataSource: {}[] = [];
  displayedColumns: string[] = [];
  selectCountriesList : { code : string, name : string }[] = [];

  override ngOnInit()
  {
    super.ngOnInit();
    this.fillCountriesList();
  }

  private fillCountriesList(offset = 0, limit = 5)
  {
    this.geoService.getCountries({ limit : limit, offset : offset }).subscribe({
      next: (data : any) => {
        for ( let element of data.data )
        {
          this.selectCountriesList.push({ code : element.wikiDataId, name : element.name });
        }

        if (data.metadata.totalCount > offset)
        {
          setTimeout(() => {
            this.fillCountriesList(limit + offset);
          }, 1000);
        }
      },
      error: (data : any) => {
        setTimeout(() => {
          this.fillCountriesList(offset);
        }, 1000);
      }
    });
  }

  protected override setListData() : void
  {
    this.selectCountriesList = [];
  }
}
