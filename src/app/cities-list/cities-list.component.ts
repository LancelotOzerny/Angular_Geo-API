import {Component, OnDestroy, OnInit} from '@angular/core';
import {GeoService} from "../services/geo.service";
import {HttpClientModule} from "@angular/common/http";
import {LangComponent} from "../lang/lang.component";
import {MatIconModule} from "@angular/material/icon";
import {ListComponent} from "../list/list.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";

@Component({
  selector: 'app-cites-list',
  imports: [HttpClientModule, LangComponent, MatIconModule, MatFormFieldModule, MatSelectModule, MatFormFieldModule,
    MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  standalone: true,
  templateUrl: 'cities-list.component.html',
  styleUrl: 'cities-list.component.scss',
  providers: [ GeoService ]
})
export class CitiesListComponent extends ListComponent implements OnInit
{
  dataSource: {}[] = [];
  displayedColumns: string[] = ['country', 'name', 'region', 'population'];
  selectCountriesList : { code : string, name : string }[] = [
    { code: 'Q222', name : 'albania' },
    { code: 'Q889', name : 'Afghanistan' },
    { code: 'Q228', name : 'Andorra' },
  ];

  private countryCode = 'none';

  override ngOnInit()
  {
    this.queryData = {
      ...this.queryData,
      countryCode: ''
    };
    super.ngOnInit();
    // this.fillCountriesList();
  }

  selectChange(event : any)
  {
    this.queryData.countryCode = event.value;
    this.setListData();
  }

  private fillCountriesList(offset = 0, limit = 5)
  {
    this.geoService.getCountries({ limit: limit, offset: offset }).subscribe({
      next: (data: any) => {
        for (let element of data.data)
        {
          this.selectCountriesList.push({ code: element.wikiDataId, name: element.name });
        }

        const newOffset = offset + limit;
        if (newOffset < data.metadata.totalCount)
        {
          // Вызвать еще раз
        }
      },
      error: (error: any) => {
        // Вызвать еще раз если ошибка 429
      }
    });
  }

  protected override setListData() : void
  {
    if (this.queryData.countryCode === 'none')
    {
      return;
    }

    this.geoService.getCities(this.queryData).subscribe({
      next: (data : any) => {
        this.dataSource = data.data;
        console.log(this.dataSource);
      }
    });
  }
}
