import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeoService
{
  constructor(private http: HttpClient) { }

  private baseUrl : string = 'https://wft-geo-db.p.rapidapi.com/';

  // key 1: 4b1e9f6388msh81adb0a7d89cc10p1c108ejsnb1235ed7ff78
  headersList : {} = {
    'X-RapidAPI-Key' : 'b62b91ef2dmsh6a4c42a5ad5c8f1p145f18jsne0351b36c5cc',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  };

  getCountries(params : any) : Observable<Object>
  {
    let limit = params.limit ?? 0;
    let offset = params.offset ?? 0;
    let prefix = params.prefix ?? '';
    let languageCode = params.lang ?? 'RU';

    let paramsList = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set('languageCode', languageCode)
      .set('namePrefix', prefix);

    return this.http.get(this.baseUrl + 'v1/geo/countries', {
      headers: this.headersList,
      params: paramsList,
    });
  }

  getCities(params : any) : Observable<Object>
  {
    let limit = params.limit ?? 0;
    let offset = params.offset ?? 0;
    let prefix = params.prefix ?? '';
    let countryIds = params.countryCode ?? '';
    let languageCode = params.lang ?? 'RU';

    let paramsList = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set('countryIds', countryIds)
      .set('languageCode', languageCode)
      .set('namePrefix', prefix);

    return this.http.get(this.baseUrl + 'v1/geo/cities', {
      headers: this.headersList,
      params: paramsList,
    });
  }
}
