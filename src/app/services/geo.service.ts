import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor(private http: HttpClient) { }

  private baseUrl : string = 'https://wft-geo-db.p.rapidapi.com/';

  headersList : {} = {
    'X-RapidAPI-Key': '4b1e9f6388msh81adb0a7d89cc10p1c108ejsnb1235ed7ff78',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  };

  getCountries(limit : number = 5, offset : number = 0, prefix : string = '')
  {
    let paramsList = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set('namePrefix', prefix);

    return this.http.get(this.baseUrl + 'v1/geo/countries', {
      headers: this.headersList,
      params: paramsList,
    });
  }
}
