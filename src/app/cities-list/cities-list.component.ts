import {Component, OnInit, ViewChild} from '@angular/core';
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
import {ActivatedRoute, RouterModule} from "@angular/router";
import {LancyPopupComponent} from "../lancy-popup/lancy-popup.component";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";
import {LanguageService} from "../services/language.service";

@Component({
  selector: 'app-cites-list',
  imports: [HttpClientModule, LangComponent, MatIconModule, MatFormFieldModule, MatSelectModule, MatFormFieldModule,
    MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, LancyPopupComponent, MatButtonToggle, FormsModule],
  standalone: true,
  templateUrl: 'cities-list.component.html',
  styleUrl: 'cities-list.component.scss',
  providers: [ GeoService ]
})
export class CitiesListComponent extends ListComponent implements OnInit
{
  @ViewChild('city_detail_popap') cityDetailPopup!: LancyPopupComponent;
  @ViewChild('city_edit_popap') cityEditPopup!: LancyPopupComponent;

  dataSource: {}[] = [];
  displayedColumns: string[] = ['country', 'name', 'countryCode', 'elevation', 'population', 'actions'];
  selectCountriesList : { code : string, name : string }[] = [];
  cityInfo = {
    id : '',
    wikiDataId : '',
    type : '',
    name : '',
    country : '',
    countryCode : '',
    region : '',
    population : '',
  }

  constructor( geoService : GeoService, langService : LanguageService, private route: ActivatedRoute )
  {
    super(geoService, langService);
  }

  override ngOnInit(): void
  {
    this.queryData = {
      ...this.queryData,
      countryCode: ''
    };

    this.route.params.subscribe(
      (data : any) => {
        this.queryData.countryCode = data.code ?? '';
      }
    );

    super.ngOnInit();
    this.fillCountriesList();
  }

  public showCityInfo(city : any) : void
  {
    this.cityInfo = city;
    this.cityDetailPopup.show();
  }

  public editCityInfo(city : any) : void
  {
    this.cityInfo = city;
    this.cityEditPopup.show();
  }

  selectChange(event : any) : void
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
        if (error.status === 429)
        {
          setTimeout(() => {
            this.fillCountriesList(offset, limit);
          }, this.queryDelay);
        }
      }
    });
  }

  protected override setListData(): void
  {
    this.paginatorIsEnable = true;

    this.geoService.getCities(this.queryData).subscribe({
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
          setTimeout(() => {
            this.setListData();
          }, this.queryDelay);
        }
      }
    });
  }
}
