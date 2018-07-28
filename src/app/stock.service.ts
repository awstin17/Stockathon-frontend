import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StockService {

  constructor(private http : HttpClient) { }
  
  getData(abbreviation) {
   return this.http.get("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + abbreviation + "&apikey=GGKHZQ2ZXMFO3FAY");
  }
}
